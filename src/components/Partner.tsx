import { FC } from "react";
import Image from "next/image";

const Partners: FC = () => {
  return (
    <div id="partners" className="bg-gradient py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 lg:mt-2 mt-20 text-[20px] uppercase text-center text-[#facc14]">Nos Partenaires</h2>
        <div className="overflow-hidden relative">
          <div className="partners-logos-wrapper justify-center items-center">
            <div className="partners-logos flex ">
              {/* Liste des logos */}
              <div className="logo-container">
                <Image src="/img/logos/eq-card.webp" alt="Partner 1" width={60} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/gimloc_logo.webp" alt="Partner 2" width={100} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/harmonie.png" alt="Partner 3" width={100} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/krypt.png" alt="Partner 4" width={200} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/logo.webp" alt="Partner 5" width={80} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/spin.png" alt="Partner 9" width={100} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/zaaa.svg" alt="Partner 6" width={60} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/casaan.png" alt="Partner 7" width={50} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/booh.png" alt="Partner 8" width={100} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/autofile.png" alt="Partner 9" width={100} height={100} priority={true}/>
              </div>
              

              {/* Duplicates to create the continuous loop effect */}
              <div className="logo-container">
                <Image src="/img/logos/eq-card.webp" alt="Partner 1" width={60} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/gimloc_logo.webp" alt="Partner 2" width={100} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/harmonie.png" alt="Partner 3" width={100} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/krypt.png" alt="Partner 4" width={200} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/logo.webp" alt="Partner 5" width={80} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/spin.png" alt="Partner 9" width={100} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/zaaa.svg" alt="Partner 6" width={60} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/casaan.png" alt="Partner 7" width={50} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/booh.png" alt="Partner 8" width={100} height={100} priority={true}/>
              </div>
              <div className="logo-container">
                <Image src="/img/logos/autofile.png" alt="Partner 9" width={100} height={100} priority={true}/>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .partners-logos-wrapper {
          position: relative;
          width: 100%;
        }
        .partners-logos {
          display: flex;
          animation: scroll-logos 10s linear infinite;
        }
        .logo-container {
          margin-right: 2rem;
        }
        @keyframes scroll-logos {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Partners;
