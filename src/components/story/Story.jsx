import './st.css';
import white from "../../assets/white.jpg";
import car from "../../assets/carto.png";

const Story = () => {
  return (
    <div className='story'>
      <div className="story_rec">
        <div className="carto">
            <img src={car} alt="" className="c_img" />
        </div>
        <h1 className="our_title">Our Story</h1>

        <p className="story_para">
          We first crossed paths on an online PenPal site, where a shy “hello” sparked a connection that quickly grew into something special.<br /><br />
          What began as messages across countries soon turned into real adventures—exploring each other’s worlds, discovering new places, and sharing cultures. 
          Each conversation brought us closer, and soon, what started as curiosity grew into a deep and meaningful bond.<br /><br />
          One of our most unforgettable early dates was in Coron, where we spent the day exploring stunning views, quiet moments, and little adventures along the way. 
          As the sun set, we ended up at a floating restaurant gently swaying above the water, lanterns glowing, feeling like the world had paused just for us.<br /><br />
          Our journey continued with countless trips and shared experiences, each one leaving us with memories we will cherish forever. 
          In March 2025, we spent two weeks in Thailand—the heat, the street food, the tours we signed up for despite being exhausted—all of it became part of our story. 
          It was during this trip that we got engaged, making it our favorite “sweaty, overfed, happily-in-love” vacation ever.<br /><br />
          Now, as we prepare to say “I do” in the beautiful tropical paradise of Koh Samui, we are overjoyed to share this moment and celebrate our love with all of you. 
          From our first shy hello to this incredible adventure, every step has led us to this magical day, and we can’t wait to create more memories with our family and friends around us.
        </p>
      </div>
    </div>
  );
}

export default Story;