import { Recommendation } from '@/types/assessment';

const TABLE_ID = 17255; // Recommendations table ID

// Utility function to get recommendations from database
export const getRecommendationsFromDB = async (answers: Record<string, any> = {}): Promise<Recommendation[]> => {
  try {
    console.log('Fetching recommendations from database...');
    
    const { data, error } = await window.ezsite.apis.tablePage(TABLE_ID, {
      PageNo: 1,
      PageSize: 100,
      OrderByField: 'ID',
      IsAsc: false,
      Filters: [
        {
          name: 'is_active',
          op: 'Equal',
          value: true
        }
      ]
    });

    if (error) {
      console.error('Error fetching recommendations from database:', error);
      // Fall back to static recommendations if database fails
      return [];
    }

    if (!data?.List || data.List.length === 0) {
      console.log('No recommendations found in database');
      return [];
    }

    console.log(`Found ${data.List.length} recommendations in database`);

    // Transform database records to Recommendation interface
    const dbRecommendations: Recommendation[] = data.List.map((item: any) => ({
      id: item.recommendation_id,
      title: item.title,
      description: item.description,
      priority: item.priority as 'high' | 'medium' | 'low',
      domain: item.domain,
      technologies: JSON.parse(item.technologies || '[]'),
      effort: item.effort
    }));

    // Apply smart recommendation prioritization logic
    const prioritizedRecommendations = [...dbRecommendations];

    // Check for Defender EPP/EDR usage
    const hasDefender = Object.values(answers).some((answer) =>
      answer.notes?.toLowerCase().includes('defender') ||
      answer.notes?.toLowerCase().includes('microsoft defender')
    );

    // Check for Azure cloud usage
    const hasAzure = Object.values(answers).some((answer) =>
      answer.notes?.toLowerCase().includes('azure') ||
      answer.notes?.toLowerCase().includes('microsoft azure')
    );

    // Prioritize SIEM/Sentinel if Defender or Azure is detected
    if (hasDefender || hasAzure) {
      const siemIndex = prioritizedRecommendations.findIndex((rec) => rec.id === 'ops-siem');
      if (siemIndex !== -1) {
        // Update SIEM recommendation to prioritize Sentinel
        prioritizedRecommendations[siemIndex] = {
          ...prioritizedRecommendations[siemIndex],
          title: 'Deploy Microsoft Sentinel SIEM',
          description: 'Implement Microsoft Sentinel for centralized security monitoring and analysis. Perfect integration with your existing Microsoft ecosystem.',
          technologies: ['Microsoft Sentinel', 'Azure Monitor', 'Log Analytics', 'Microsoft Defender Integration'],
          priority: 'high'
        };

        // Move SIEM recommendation to the top of the array
        const siemRec = prioritizedRecommendations.splice(siemIndex, 1)[0];
        prioritizedRecommendations.unshift(siemRec);
      }
    }

    return prioritizedRecommendations;
  } catch (error) {
    console.error('Error in getRecommendationsFromDB:', error);
    return [];
  }
};

// Fallback function that combines database and static recommendations
export const recommendationDatabase = async (answers: Record<string, any> = {}): Promise<Recommendation[]> => {
  const dbRecommendations = await getRecommendationsFromDB(answers);
  
  // If we have database recommendations, use them
  if (dbRecommendations.length > 0) {
    return dbRecommendations;
  }

  // Fallback to original static recommendations if database is empty
  console.log('Using fallback static recommendations');
  const { recommendationDatabase: staticRecommendations } = await import('./recommendations');
  return staticRecommendations(answers);
};