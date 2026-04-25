
export interface ReviewShowing{
    result:ReviewResponse
}


export interface ReviewResponse{
ats_score:number,
grade:string,
summary:string,
criteria:Criteria,
topImprovements:string[],
strengths:string[],
}

export interface Criteria{
formatting:Formatting
contentCompleteness:ContentCompleteness
impactAchievements:ImpactAchievements
keywordDensity:KeywordDensity
writingQuality:WritingQuality
}


export interface Formatting{
score:number,
label:string,
issues:string[],
feedback:string,
}

export interface ContentCompleteness{
score:number,
label:string,
presentSections:string[],
missingSections:string[],
feedback:string,

}
export interface ImpactAchievements{

score:number,
label:string,
careerStage:string,
examplesFound:string[],
suggestions:string[],
feedback:string,

}

export interface KeywordDensity{
score:number,
label:string,
strongKeywords:string[],
weakAreas:string[],
feedback:string,

}

export interface WritingQuality{
score:number,
label:string,
issues:string[],
feedback:string,
}