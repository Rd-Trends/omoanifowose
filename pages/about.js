import Link from "next/link";

import Seo from "@/components/SEO";

//  * hooks
import useURL from "hooks/useURL";

import LayoutWithNavigation from "layout/LayoutWithNavigation";

import S from "@/styles/policystyles.module.scss";

const About = () => {
  const url = useURL();

  return (
    <>
      <main className={S.wrapper}>
        <Seo url={url} seo={{ title: "About " }} />
        <div>
          <h2>About Me</h2>
          <p>
            The name’s AGBINONE EJIRO KINGSLEY. I am a music enthusiast,
            occassional purveyor of wisdom, and also, a prolific writer. I am a
            certified music distributor, partnering with Fresible music company,
            in simple diction, I help artists distribute their songs to digital
            platforms. Of course, I won’t fail to mention that I am the owner of
            the brand Omo Anifowose Entertainment.
          </p>
          <h2>Principle</h2>
          <p>
            My tenet is reliant on schooling my thought – wholly, regularly;
            keeping abreast with the latest music around the globe, motivational
            quotes, and every spicy news on celebrities.{" "}
          </p>

          <h2>The Brand</h2>
          <p>
            Omo Anifowose Entertainment is a registered business entity. The
            Corporate Affairs Commission (CAC) certificate was issued to the
            brand on the 12th of April 2022.
          </p>
          <p>
            What makes me and my brand stand out is my profundity for good music
            (symphony in general) and also my dexterity in writing great music.
          </p>
          <p>
            This brand is committed to keeping you updated with everything
            related to entertainment.
          </p>
        </div>
      </main>
    </>
  );
};

export default About;
