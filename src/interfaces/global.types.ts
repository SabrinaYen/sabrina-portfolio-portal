export type ExperienceItem = {
    role: string;
    company: string;
    years: string;
    description: string;
};

export type GroupItem = {
    groupTitle: string;
    groupDesc: string;
};

export type ProjectItem = {
    projectName: string;
    projectDesc: string;
    techStack: string;
    linkURL: string;
    projectShown: boolean;
    companyName: string;
};

export type ContentData = {
    headline: string;
    subhead: string;
    name: string;
    position: string;
    bio: string;
    email: string;
    location: string;
};