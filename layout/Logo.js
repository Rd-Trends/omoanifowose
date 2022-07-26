import Image from "next/image";
import Link from "next/link";

const Logo = ({ imgSrc }) => {
  return (
    <Link href="/">
      <a className="d-flex align-items-center logo">
        <Image
          src="/logo/fav.svg"
          width={45}
          height={45}
          alt="Anifowose Logo"
          priority
        />
        <p className="logo-text">
          <strong>
            <span>Omo</span>Anifo<span>wose</span>
          </strong>
        </p>
      </a>
    </Link>
  );
};

export default Logo;
