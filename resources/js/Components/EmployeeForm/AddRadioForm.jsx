import { useEffect, useState } from "react";
import {
  PointerSensor,
  DndContext,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortItem from "./SortItem.jsx";
import Modal from "react-modal";
import { Button } from "../../Components/ui/button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../Components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../Components/ui/radio-group";
import Radio_CP from "@/Components/EmployeeForm/InputsComponents/Radio_cp.jsx";

function AddRadioForm({
  isModalOpen,
  setIsModalOpen,
  currentItem,
  setCurrentItem,
  handleUpdateItem,
  items,
  setItems,
}) {
  const [options, setOptions] = useState([
    { id: "option-1", label: "" },
    { id: "option-2", label: "" },
    { id: "option-3", label: "" },
    { id: "option-4", label: "" },
  ]);
  const [label, setLabel] = useState("");
    const [selectedValue, setSelectedValue] = useState(null);

const addOption = () => {
  event.preventDefault();
  const newOption = {
    id: `option-${options.length + 1}`,
    label: "",
  };
  setOptions((prevOptions) => [...prevOptions, newOption]);
};

  const deleteOption = (id) => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id)
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(
          (item) => item && item.id === active.id
        );
        const newIndex = items.findIndex((item) => item && item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        console.log(newItems);
        return newItems;
      });
    }
  };

    const handleDeleteItem = (id) => {
        setItems((items) => items.filter((item) => item.id !== id));
    };

  const handleInputChange = (id, value) => {
    setItems((items) =>
      items.map((item) => (item && item.id === id ? { ...item, value } : item))
    );
  };

  const handleEditItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setCurrentItem(itemToEdit);
    setIsModalOpen(true);
  };

  const handleConfigureItem = (event) => {
    event.preventDefault();

    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
          (item) => item.id === currentItem.id
      );

      const updatedItem = {
        ...currentItem,
        label,
        options,
      };

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = updatedItem;
        return updatedItems;
      } else {
        return [...prevItems, updatedItem];
      }
    });

    // Reset the states
    setLabel("");
    setOptions([
      { id: "option-1", label: "" },
      { id: "option-2", label: "" },
      { id: "option-3", label: "" },
      { id: "option-4", label: "" },
    ]);

    setIsModalOpen(false);
  };

  useEffect(() => {
    if (currentItem && currentItem.options) {
      setLabel(currentItem.label);
      setOptions(currentItem.options);
    }
    console.log(currentItem);
    console.log(items);
  }, [currentItem, items]);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(pointerSensor);


  return (
    <div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.filter(Boolean).map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map(
            (item) =>
              item && (
                <SortItem
                  key={item.id}
                  id={item.id}
                  item={item}
                  onInputChange={handleInputChange}
                  onEditItem={handleEditItem}
                  handleDeleteItem={handleDeleteItem}
                  className={"m-4"}
                />
              )
          )}
        </SortableContext>
      </DndContext>

      {currentItem && (
          <Modal
              isOpen={isModalOpen}
              ariaHideApp={false}
              onRequestClose={() => setIsModalOpen(false)}
              appElement={document.getElementById("root")}
          >
              <h2 className="text-center text-xl text-black">Configure Input</h2>
              {currentItem && (
                  <form onSubmit={handleConfigureItem}>
                      <RadioGroup defaultValue="option-one" className="text-black">
                          <Input
                              type="text"
                              id="label"
                              placeholder={"Insert question here"}
                              className="text-black"
                              onChange={e => setLabel(e.target.value)}
                              value={label}
                          /> {options.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.id} id={option.id}/>
                              <Input
                                  type="text"
                                  value={option.label}
                                  onChange={(e) =>
                                      setOptions(
                                          options.map((opt) =>
                                              opt.id === option.id
                                                  ? {...opt, label: e.target.value}
                                                  : opt
                                          )
                                      )
                                  }
                                  placeholder="Enter option label"
                              />
                              <Button onClick={() => deleteOption(option.id)}>
                                  <FontAwesomeIcon icon={faTrashCan}/>
                              </Button>
                          </div>
                      ))}
                      </RadioGroup>
                      <Button onClick={addOption}>Add Option</Button>
                  </form>
              )}

              <div className="mt-12">
                  <h2 className="mb-6 text-center text-2xl text-black">Preview</h2>
                  {currentItem && label && (
                      <Radio_CP
                          item={{label, options}}
                          onInputChange={() => {}}
                          onEditItem={() => {}}
                          handleDeleteItem={() => {}}
                          id={currentItem.id}
                          setNodeRef={() => {}}
                          attributes={{}}
                          listeners={{}}
                          handle={() => {}}
                          showButtons={false}
                          setSelectedValue={setSelectedValue}
                      />
                  )}
              </div>
                  <div className="flex justify-end">
                      <Button
                          onClick={handleConfigureItem}
                          variant="default"
                          type="submit"
                      >
                          Save
                      </Button>
                  </div>
          </Modal>
      )}
    </div>
  );
}

export default AddRadioForm;
