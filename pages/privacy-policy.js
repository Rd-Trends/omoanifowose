import Link from "next/link";

import Seo from "@/components/SEO";

//  * hooks
import useURL from "hooks/useURL";

import LayoutWithNavigation from "layout/LayoutWithNavigation";

import S from "@/styles/policystyles.module.scss";

const PrivacyPolicy = () => {
  const url = useURL();

  return (
    <>
      <main className={S.wrapper}>
        <Seo url={url} seo={{ title: "Privacy Policy" }} />
        <div>
          <h1>Privacy Policy</h1>
          <p>
            This privacy policy will help you understand how
            <Link href="/"> Omoanifowose.com </Link>
            uses and protects the data you provide to us when you visit our
            website and use our services
          </p>
          <p>
            We reserve the right to change this policy at any given time, of
            which you will be promptly updated. If you want to make sure that
            you are up to date with the latest changes, we advise you to
            frequently visit this page.
          </p>
        </div>

        <div>
          <h2>What User Data We Collect</h2>
          <p>When you visit the website, we may collect the following data:</p>
          <ul>
            <li>Your IP address.</li>
            <li>Your contact information and email address.</li>
            <li>Other information such as interests and preferences.</li>
            <li>Data profile regarding your online behavior on our website.</li>
          </ul>
        </div>

        <div>
          <h2>Why We Collect Your Data</h2>
          <p>We are collecting your data for several reasons:</p>
          <ul>
            <li>To better understand your needs</li>
            <li>To improve our services and products.</li>
            <li>
              To send you promotional emails containing the information we think
              you will find interesting.
            </li>
            <li>
              To contact you to fill out surveys and participate in other types
              of market research.
            </li>
            <li>
              To customize our website according to your online behavior and
              personal preferences.
            </li>
          </ul>
        </div>

        <div>
          <h2>Safeguarding and Securing the Data</h2>
          <p>
            Omoanifowose is committed to securing your data and keeping it
            confidential. Omoanifowose has done all in its power to prevent data
            theft, unauthorized access, and disclosure by implementing the
            latest technologies and software, which help us safeguard all the
            information we collect online.
          </p>
          <h2>Links to Other Websites</h2>
          <p>
            Our website contains links that lead to other websites. If you click
            on these links Omoanifowose is not held responsible for your data
            and privacy protection. Visiting those websites is not governed by
            this privacy policy agreement. Make sure to read the privacy policy
            documentation of the website you go to from our website.
          </p>
        </div>

        <div>
          <h2>Restricting the Collection of your Personal Data</h2>
          <p>
            At some point, you might wish to restrict the use and collection of
            your personal data. You can achieve this by doing the following:
          </p>
          <ul>
            <li>
              When you are filling the forms on the website, make sure to check
              if there is a box which you can leave unchecked, if you do not
              want to disclose your personal information.
            </li>
            <li>
              If you have already agreed to share your information with us, feel
              free to contact us via email and we will be more than happy to
              change this for you.
            </li>
            <li>
              Omoanifowose will not lease, sell or distribute your personal
              information to any third parties, unless we have your permission.
              We might do so if the law forces us. Your personal information
              will be used when we need to send you promotional materials if you
              agree to this privacy policy.
            </li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;
