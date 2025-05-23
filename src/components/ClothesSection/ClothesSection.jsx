import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ onCardClick, clothingItems, onAddNewItem }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__items">
        <p className="clothes-section__title">Your Items</p>
        <button
          type="button"
          className="clothes-section__btn"
          onClick={onAddNewItem}
        >
          {" "}
          + Add items
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((filteredCard, index) => {
          return (
            <ItemCard
              key={filteredCard._id || `item-${index}`}
              item={filteredCard}
              onCardClick={onCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
