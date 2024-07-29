import "./css/About-info.css";

export const About_info = () => {
  return (
    <main>
      <section className="section-content">
        <div id="ong-text" className="text-content">
          <h2 className="heading">Sobre Podogología Gonnet</h2>

          <p className="paragraph">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam ipsa
            ipsum eius delectus esse laborum, amet quasi facilis culpa voluptas
            voluptatum rem libero maiores fugiat eum quam corrupti nostrum.
            Commodi.
          </p>
          <p className="paragraph">
            {" "}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam ipsa
            ipsum eius delectus esse laborum, amet quasi facilis culpa voluptas
            voluptatum rem libero maiores fugiat eum quam corrupti nostrum.
            Commodi.
          </p>
        </div>
        <div id="ong" className="image-container">
          <img
            className="image"
            height="500"
            src="/assets/ImagenesOptimizadas/woman-s-feet-bowl-with-water-petal_329181-18808.jpg"
            width="500"
            alt="Podología Gonnet"
          />
        </div>
      </section>
      <section className="section-content">
        <div id="community" className="image-container">
          <img
            className="image"
            height="556"
            src="/assets/ImagenesOptimizadas/woman-s-feet-bowl-with-water-petal_329181-18808.jpg"
            width="812"
            alt="Podología Gonnet"
          />
        </div>
        <div id="community-text" className="text-content">
          <h2 className="heading">¿Quienes somos?</h2>
          <p className="paragraph">
            {" "}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam ipsa
            ipsum eius delectus esse laborum, amet quasi facilis culpa voluptas
            voluptatum rem libero maiores fugiat eum quam corrupti nostrum.
            Commodi.
          </p>
          <p className="paragraph">
            {" "}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam ipsa
            ipsum eius delectus esse laborum, amet quasi facilis culpa voluptas
            voluptatum rem libero maiores fugiat eum quam corrupti nostrum.
            Commodi.
          </p>
        </div>
      </section>
    </main>
  );
};
