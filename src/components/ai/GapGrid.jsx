import GapCard from "./GapCard";

const GapGrid = () => {
  const data = [
    {
      title: "Biology - Cells",
      image: "/src/assets/bio.png",
      observation:
        "Struggling with cell division concepts. Performance dropped 15% in recent quiz.",
      recommendation:
        "Focus on Mitosis vs Meiosis. Study differences, then retry exercises.",
    },
    {
      title: "Chemistry - Chemical Reactions",
      image: "/src/assets/chem.png",
      observation:
        "You understand basics but struggle with balancing equations.",
      recommendation:
        "Review balancing equations, then take a short quiz.",
    },
    {
      title: "Physics - Motion and Forces",
      image: "/src/assets/physic.png",
      observation:
        "Good basics but struggling with formulas in motion and force.",
      recommendation:
        "Review motion formulas, then complete a practice quiz.",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-4">
      {data.map((item, index) => (
        <GapCard key={index} {...item} />
      ))}
    </div>
  );
};

export default GapGrid;