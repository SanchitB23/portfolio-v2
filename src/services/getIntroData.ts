import { CMS_BASE_URL } from "@/constants";

export async function getSocialsData() {
  const socialMediaPromise = await fetch(
    `${CMS_BASE_URL}spaces/s3ihk2ts57lt/entries?content_type=socialMediaUrLs`,
    {
      cache: "default",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
      },
    },
  );
  if (!socialMediaPromise.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const res = await socialMediaPromise.json();
  return res.items.map(
    ({ fields }: { fields: ISocialMediaFields[] }) => fields,
  ) as ISocialMediaFields[];
}

export async function getIntroData() {
  const aboutMePromise = await fetch(
    `${CMS_BASE_URL}spaces/s3ihk2ts57lt/entries?content_type=aboutMe`,
    {
      cache: "default",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
      },
    },
  );
  if (!aboutMePromise.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const aboutMeRes = await aboutMePromise.json();
  return aboutMeRes.items.map(
    ({ fields }: { fields: IAboutMe[] }) => fields,
  )[0] as IAboutMe;
}

export async function getLeftData() {
  const socials = await getSocialsData();
  const aboutMe = await getIntroData();

  return {
    socials,
    aboutMe,
  };
}
