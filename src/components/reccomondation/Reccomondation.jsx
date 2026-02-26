import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "./re.css";
import Nav from "../nav/Nav";
import Header from "../header/Header";

const Reccomondation = () => {
  return (
    <div className="re_wrapper">
      <Nav />
      <Header title="Recommendations" />

      {/* Title Section */}
      <div className="resa">
        <div className="re_card">
          <h2 className="re_title">Recommendations</h2>
          <p className="mm">
            Welcome to Belgrade 🇷🇸 We’re so excited to celebrate with you in one
            of Europe’s most vibrant and historic cities. If you have extra time
            during your stay, here are some highly recommended places to eat,
            explore, and enjoy.
          </p>
        </div>

        {/* Accordion Section */}
        <Accordion type="single" collapsible className="re_accordion">
          {/* Lunch & Coffee */}
          <AccordionItem value="item-1" className="halo">
            <AccordionTrigger className="nui">
              Lunch & Coffee Spots
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Smokvica Kralja Petra</strong> – Relaxed garden café
                  with an international menu
                </li>
                <li>
                  <strong>Bloom</strong> – Modern restaurant with bold flavors
                  and a stylish vibe
                </li>
                <li>
                  <strong>Drip Specialty Coffee</strong> – Cozy stop for
                  excellent coffee
                </li>
                <li>
                  <strong>Sloj</strong> – Café-bistro known for pastries and
                  all-day brunch
                </li>
                <li>
                  <strong>June</strong> – Cozy brunch spot with great food,
                  coffee, and fresh juices
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Dinner & Supper Clubs */}
          <AccordionItem value="item-2" className="halo">
            <AccordionTrigger className="nui">
              Dinner & Supper Clubs
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Tri šešira</strong> – Iconic Serbian restaurant in
                  Skadarlija
                </li>
                <li>
                  <strong>Velika Skadarlija</strong> – Bohemian dining with
                  historic charm
                </li>
                <li>
                  <strong>Sakura</strong> – Refined Asian cuisine with live
                  performances
                </li>
                <li>
                  <strong>Thyme</strong> – Indian fusion dining experience
                </li>
                <li>
                  <strong>Suvenir Splav</strong> – Riverside Mediterranean &
                  Serbian cuisine
                </li>
                <li>
                  <strong>Lafayette</strong> – Restaurant-club with cabaret
                  shows and dinner
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Things to Do */}
          <AccordionItem value="item-4" className="halo">
            <AccordionTrigger className="nui">
              Things to See & Do
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Kalemegdan Fortress & Park</strong> – Views of the
                  Danube and Sava rivers
                </li>
                <li>
                  <strong>Skadarlija</strong> – Cobblestone street filled with
                  music and history
                </li>
                <li>
                  <strong>Knez Mihailova Street</strong> – Main pedestrian
                  shopping street
                </li>
                <li>
                  <strong>Dorćol</strong> – Historic neighborhood with cafés and
                  creative energy
                </li>
                <li>
                  <strong>Belgrade Waterfront</strong> – Modern riverside
                  development
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Nightlife */}
          <AccordionItem value="item-5" className="halo">
            <AccordionTrigger className="nui">
              Nightlife & Local Experiences
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <strong>Beton Hala</strong> – Riverside dining, bars, and
                  nightlife
                </li>
                <li>
                  <strong>Splavs</strong> – Floating river clubs along the Sava
                  and Danube
                </li>
                <li>
                  <strong>Traditional Kafanas</strong> – Live music, local
                  drinks, and lively vibes
                </li>
                <li>
                  <strong>Wineries</strong> – Beautiful wineries just outside
                  Belgrade
                </li>
              </ul>
              <p className="re_tip">
                <strong>Local Tip:</strong> Don’t leave without trying rakija,
                ćevapi, and ajvar!
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <h2 className="ooters">Jaslene & Mišel © All Rights Reserved</h2>
    </div>
  );
};

export default Reccomondation;
