import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "../reccomondation/re.css";

const Faq = () => {
  return (
    <div className="re_wrapper">

      {/* Title Section */}
      <div className="resa">
        <div className="re_card">
          <h2 className="re_title">FAQ</h2>
          <p className="mm">
            Here are answers to some common questions about our wedding. If you have additional questions, please contact us.
          </p>
        </div>

        <Accordion type="single" collapsible className="re_accordion">

          {/* FAQ 1 */}
          <AccordionItem value="faq-1" className="halo">
            <AccordionTrigger className="nui">
              When’s the RSVP deadline?
            </AccordionTrigger>
            <AccordionContent>
              <p className="ans">
                Please RSVP by 1st December 2026 so we can have an accurate headcount.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 2 */}
          <AccordionItem value="faq-2" className="halo">
            <AccordionTrigger className="nui">
              Can I bring a guest?
            </AccordionTrigger>
            <AccordionContent>
              <p className="ans">
                Yes you can bring a plus 1, please inform us if you do as we will need to inform the venue. And ensure adequate catering is provided.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 3 */}
          <AccordionItem value="faq-3" className="halo">
            <AccordionTrigger className="nui">
              Are kids welcomed?
            </AccordionTrigger>
            <AccordionContent>
              <p className="ans">
                Yes
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 4 */}
          <AccordionItem value="faq-4" className="halo">
            <AccordionTrigger className="nui">
              What will the weather be like?
            </AccordionTrigger>
            <AccordionContent>
              <p className="ans">
                Koh Samui will be hot, sunny and dry, with average temperatures sitting between 26-31c
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 5 */}
          <AccordionItem value="faq-5" className="halo">
            <AccordionTrigger className="nui">
              What’s the dress code?
            </AccordionTrigger>
            <AccordionContent>
              <p className="ans">
                Formal Attire with colour themes of Beige, purple, white
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 6 */}
          <AccordionItem value="faq-6" className="halo">
            <AccordionTrigger className="nui">
              Is the wedding inside or outside?
            </AccordionTrigger>
            <AccordionContent>
              <p className="ans">
                Our ceremony will be outdoors, but the canepe and cocktail/drinks reception and dinner will be on the pool deck and in an airconditioned restaurant.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 7 */}
          <AccordionItem value="faq-7" className="halo">
            <AccordionTrigger className="nui">
              Can we take photos on our phones and cameras during the wedding?
            </AccordionTrigger>
            <AccordionContent>
              <p className="ans">
                Absolutely! We’d love you to snap some photos and share them.
              </p>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>

    </div>
  );
};

export default Faq;