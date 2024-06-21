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
    <div className="character-item border rounded md:flex md:items-start">
      <img
        src={`https://picsum.photos/200/300?random=${character.id}`}
        alt={character.name}
        className="character-image w-full h-48 object-cover mb-4 md:h-60 md:mb-0 md:mr-4"
      />
      <div className="character-text w-full md:w-2/3 p-4">
        <h2 className="font-helvetica text-20 md:text-16 font-normal leading-28 md:leading-24 letter-spacing-1 text-left mb-2">
          {character.name}
        </h2>
        <p className="font-helvetica text-16 md:text-14 font-normal leading-28 md:leading-20 letter-spacing-1 text-left mb-4">
          {character.homeworld.name}
        </p>
        <div className="character-info">
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
      </div>
    </div>
  );
};

export default CharacterItem;
