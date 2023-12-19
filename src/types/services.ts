interface ISocialMediaFields {
  name: string;
  socialUrl: string;
}

interface IAboutMe {
  personalName: string;
  email: string;
  designation: string;
  aboutMe: string;
  oneLiner: string;
  techStack: string[];
}

interface IJobs {
  url: string;
  title: string;
  company: string;
  companyShort: string;
  dateRange: string;
  description: [string];
}

interface IFeaturedProjects {
  title: string;
  description: string;
  url: string;
  tags: string[];
  image: any;
}
