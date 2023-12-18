import { CMS_BASE_URL } from "@/constants";

export async function getIntroData() {
  const socialMediaPromise = await fetch(
    `${CMS_BASE_URL}spaces/s3ihk2ts57lt/entries?content_type=socialMediaUrLs`,
    {
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
      },
    },
  );
  if (!socialMediaPromise.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const aboutMePromise = await fetch(
    `${CMS_BASE_URL}spaces/s3ihk2ts57lt/entries?content_type=aboutMe`,
    {
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
      },
    },
  );
  if (!aboutMePromise.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const socialMediaRes = await socialMediaPromise.json();
  const aboutMeRes = await aboutMePromise.json();

  return {
    socials: socialMediaRes.items.map(
      ({ fields }: { fields: ISocialMediaFields[] }) => fields,
    ) as ISocialMediaFields[],
    aboutMe: aboutMeRes.items.map(
      ({ fields }: { fields: IAboutMe[] }) => fields,
    )[0] as IAboutMe,
  };
}
