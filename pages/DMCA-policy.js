import Link from "next/link";

import Seo from "@/components/SEO";

//  * hooks
import useURL from "hooks/useURL";

import LayoutWithNavigation from "layout/LayoutWithNavigation";

import S from "@/styles/policystyles.module.scss";

const DMCA = () => {
  const url = useURL();

  return (
    <>
      <main className={S.wrapper}>
        <Seo url={url} seo={{ title: "DCMA Policy" }} />
        <div>
          <h1>DMCA Policy</h1>
          <p>
            Omoanifowose respects the rights of copyright holders and will work
            with said copyright holders to ensure that infringing material is
            removed from our service. We monitor file uploads to make sure that
            copyrighted material is not uploaded and proactively ban any users
            that do not adhere to our terms of service. In cases where you feel
            a file infringes on your copyright or the copyright of someone you
            represent, we encourage you to use this page to notify us.
          </p>
          <p>
            Omoanifowose will respond to any and all takedown requests that
            comply with the requirements of the Digital Millennium Copyright Act
            (DMCA), and other applicable intellectual property laws.
          </p>

          <p>
            If you believe that a file that was uploaded to Omoanifowose
            infringes on your copyright then please contact the email below to
            submit a notification to the “Digital Millennium Copyright Act
            (DMCA)” by providing the following information in writing;
          </p>

          <ol>
            <li>
              A physical or electronic signature of a person authorized to act
              on behalf of the owner of an exclusive right that is allegedly
              infringed.
            </li>
            <li>
              Identification of the copyrighted work claimed to have been
              infringed, or, if multiple copyrighted works on the Omoanifowose
              website are covered by a single notification, a representative
              list of such works at that site.
            </li>
            <li>
              Identification of the material that is claimed to be infringing or
              to be the subject of infringing activity and that is to be removed
              or access to which is to be disabled, and information reasonably
              sufficient to permit Omoanifowose to locate the material.{" "}
              <strong>
                Providing specific URLs of the allegedly infringing content in
                the body of an email is the best way to help us to locate the
                content quickly.
              </strong>
            </li>
            <li>
              Information reasonably sufficient to permit Omoanifowose to
              contact you, such as an address, telephone number, and, if
              available, an electronic mail address at which you may be
              contacted.
            </li>
            <li>
              A statement that you have a good faith belief that use of the
              material in the manner complained of is not authorized by the
              copyright owner, its agent, or the law.
            </li>
            <li>
              A statement that the information in the notification is accurate,
              and under penalty of perjury, that you are authorized to act on
              behalf of the owner of an exclusive right that is allegedly
              infringed.
            </li>
            <li>
              Please note here that if you fail to comply with all of the
              requirements of this section, your DMCA notice may not be valid.
              Thanks
            </li>
          </ol>
        </div>
      </main>
    </>
  );
};

export default DMCA;
