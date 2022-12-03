export function subjectCalculateRatings(ratings: []) {
    let complexity = 0;
    let relevance = 0;
    if(ratings.length === 0) return {complexity, relevance};
    ratings.forEach((rating: any) => {
        complexity += rating.complexity;
        relevance += rating.relevance;
    });
    complexity = complexity / ratings.length;
    relevance = relevance / ratings.length;
    return { complexity, relevance };
}