import "./ve.css";
import cam from "../../assets/cami.png";
import djx from "../../assets/dj.jpg";
const Vendor = () => {
  return (
    <div className="vendors">
      <div className="vendor">
        <h2 className="vendor_title"> 💍 Wedding Celebrant</h2>

        <p className="sm_vendor_p">
          Our wedding ceremony will be officiated by Mr. Camille, an
          English-speaking celebrant who will guide us through this special
          moment. A rehearsal will take place the day before the wedding to
          ensure everything runs smoothly.
        </p>
        <div className="hol">
          <img src={cam} alt="" className="cam_img" />
        </div>
        <h3 className="sm_vendor_title">Master Celebrant – Mr. Camille</h3>
      </div>

      {/* photography and videography */}

      <div className="panda">
        <div className="panda_grid">
          <div className="panda_sub">
            <div className="kolla">
              <img
                src="https://images.pexels.com/photos/1051544/pexels-photo-1051544.jpeg"
                alt=""
                className="panda_img"
              />
            </div>
          </div>
          <div className="panda_sub maha">
            <h2 className="vendor_title aha"> Photography & Videography</h2>

            <p className="sm_vendor_p aha sax">
              Our wedding day will be lovingly captured by professional
              photographers and videographers, ensuring that every heartfelt
              moment, laugh, and joyful tear is preserved.
              <br />
              <br />
              From the ceremony by the stunning ocean at Silavadee Resort to the
              elegant evening festivities under the tropical sky, every
              detail—from the floral arrangements to the candlelit tables, the
              laughter of our guests, and the intimacy of our vows—will be
              beautifully documented. These memories will be artfully crafted
              into photos and videos that we can treasure for a lifetime,
              allowing us to relive the magic of our special day over and over
              again.
            </p>

            <button className="vendor_btn">
              <a href="https://www.weerayutjanthai.com/about">See Their Work</a>
            </button>
          </div>
        </div>
      </div>

      {/* dj */}

      <div className="panda dj">
        <div className="panda_grid sola">
          <div className="panda_sub maha">
            <h2 className="vendor_title aha"> Music & Entertainment </h2>

            <p className="sm_vendor_p aha sax">
              Our wedding reception will be brought to life by a professional
              DJ, ensuring an unforgettable evening filled with music, dancing,
              and celebration. 
              
              <br/>
              <br/>
              The entertainment will be enhanced with a
              high-quality sound system and elegant lighting to create a magical
              ambiance under the tropical sky. From the first toast to the final
              dance, every moment will be perfectly accompanied by music,
              setting the tone for joyous memories that we and our guests will
              cherish forever.
            </p>

            <button className="vendor_btn">
              <a href="https://www.instagram.com/kohsamuievents">See Their Work</a>
            </button>
          </div>

          <div className="panda_sub">
            <div className="kolla">
              <img src={djx} alt="" className="panda_img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendor;
