import "./sc.css";
import hawo from "../../assets/hotel.webp";

const Hotel = () => {
  return (
    <div className="cols">
      <div className="subaru"></div>
      <h2 className="  masa">Hotel Details</h2>

      {/* Updated top note */}
      <p className="joms">
       We’ve selected a range of beautiful resorts in Koh Samui for our guests to enjoy a relaxing and comfortable stay. From luxury beachfront villas to convenient nearby hotels, there are options to suit different preferences and budgets. We recommend booking early to secure your preferred accommodation 🌴
      </p>

      {/* Primary Hotel */}
      <div className="gosa">
        <div className="hotel-info">
          <div className="card">
            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/bb/fc/40/ocean-front-pool-villa.jpg?w=1000&h=-1&s=1" alt="" className="hotel_imgs" />
            <br />

            <h3 className=" posv">Silavadee Pool Spa Resort</h3>

            {/* <p className="dress_para jom">
              Use code <strong>“Klisara2026”</strong> for the group rate.
            </p> */}

            <p className="dress_title po ">
              {/* <strong>Website:</strong> */}
              <div className="bosi">
                <a
                  href="https://secure.phobs.net/book.php?page=availability&companyid=1536&hotelid=7151&checkin=2026-09-13&checkout=2026-09-14&partnerid=24824&crcid=266fa92b76cb2157d16e447eb5496f63"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="balki"
                >
                  Book Now
                </a>
              </div>
            </p>
          </div>
        </div>

        {/* Secondary Hotel */}
        <div className="hotel-info">
          <div className="card">
            <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/c6/65/8b/crystal-bay-yacht-club.jpg?w=2000&h=-1&s=1"
              alt=""
              className="hotel_imgs"
            />
            <br />
            <h3 className="posv">Crystal Bay Yacht Club</h3>

            {/* <p className="dress_para jom">
              This is an alternative hotel option located in the city centre.
            </p> */}

            <p className="dress_title po uu">
              {/* <strong>Website:</strong> */}
              <div className="bosi">
                <a

                href="https://secure.phobs.net/book.php?page=availability&companyid=167&hotelid=367&checkin=2026-09-15&checkout=2026-09-16&partnerid=24811&crcid=bc6f0f08f8345f839bacf6e96f7b9aa5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="balki"
                >
                  Book Now
                </a>
              </div>
            </p>
          </div>
        </div>



    <div className="hotel-info">
          <div className="card">
            <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/5a/c1/34/coral-cliff-beach-resort.jpg?w=1400&h=-1&s=1"
              alt=""
              className="hotel_imgs"
            />
            <br />
            <h3 className="posv">Coral Cliff Beach Resort</h3>

            {/* <p className="dress_para jom">
              This is an alternative hotel option located in the city centre.
            </p> */}

            <p className="dress_title po uu">
              {/* <strong>Website:</strong> */}
              <div className="bosi">
                <a

                href="https://secure.phobs.net/book.php?page=availability&companyid=167&hotelid=367&checkin=2026-09-15&checkout=2026-09-16&partnerid=24811&crcid=bc6f0f08f8345f839bacf6e96f7b9aa5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="balki"
                >
                  Book Now
                </a>
              </div>
            </p>
          </div>
        </div>




 <div className="hotel-info">
          <div className="card">
            <img

            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/62/0e/16/lobster-bar--v5463376.jpg?w=2000&h=-1&s=1"
              alt=""
              className="hotel_imgs"
            />
         <br/>
            <h3 className="posv">Samui Resotel Beach Resort</h3>

            {/* <p className="dress_para jom">
              This is an alternative hotel option located in the city centre.
            </p> */}

            <p className="dress_title po uu">
              {/* <strong>Website:</strong> */}
              <div className="bosi">
                <a

                href="https://secure.phobs.net/book.php?page=availability&companyid=167&hotelid=367&checkin=2026-09-15&checkout=2026-09-16&partnerid=24811&crcid=bc6f0f08f8345f839bacf6e96f7b9aa5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="balki"
                >
                  Book Now
                </a>
              </div>
            </p>
          </div>
        </div>


         <div className="hotel-info">
          <div className="card">
            <img
src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/79/f0/5c/caption.jpg?w=1200&h=-1&s=1"
              alt=""
              className="hotel_imgs"
            />
         <br/>
            <h3 className="posv">OZO Chaweng Samui</h3>

            {/* <p className="dress_para jom">
              This is an alternative hotel option located in the city centre.
            </p> */}

            <p className="dress_title po uu">
              {/* <strong>Website:</strong> */}
              <div className="bosi">
                <a

                href="https://secure.phobs.net/book.php?page=availability&companyid=167&hotelid=367&checkin=2026-09-15&checkout=2026-09-16&partnerid=24811&crcid=bc6f0f08f8345f839bacf6e96f7b9aa5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="balki"
                >
                  Book Now
                </a>
              </div>
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Hotel;
