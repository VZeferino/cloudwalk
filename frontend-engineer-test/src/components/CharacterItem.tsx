interface CharacterItemProps {
  character: {
    id: number;
    name: string;
    homeworld: { name: string };
    height: string;
    mass: string;
    gender: string;
  };
}

const CharacterItem: React.FC<CharacterItemProps> = ({ character }) => {
  return (
    <div className="p-4 border rounded">
      <img
        src={`https://picsum.photos/200/300?random=${character.id}`}
        alt={character.name}
        className="w-full h-48 object-cover mb-4"
      />
      <h2 className="font-helvetica text-20 font-normal leading-28 letter-spacing-1 text-left mb-2">
        {character.name}
      </h2>
      <p className="font-helvetica text-16 font-normal leading-28 letter-spacing-1 text-left mb-4">
        {character.homeworld.name}
      </p>
      <p className="font-helvetica text-12 font-normal leading-16 letter-spacing-0.5 text-left text-background mb-1">
        HEIGHT • {character.height.toUpperCase()}
      </p>
      <p className="font-helvetica text-12 font-normal leading-16 letter-spacing-0.5 text-left text-background mb-1">
        MASS • {character.mass.toUpperCase()}
      </p>
      <p className="font-helvetica text-12 font-normal leading-16 letter-spacing-0.5 text-left text-background">
        GENDER • {character.gender.toUpperCase()}
      </p>
    </div>
  );
};

export default CharacterItem;
