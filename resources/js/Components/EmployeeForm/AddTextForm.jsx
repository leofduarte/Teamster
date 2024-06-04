import {useEffect} from "react";
import { PointerSensor, DndContext, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortItem from "./SortItem.jsx";
import Modal from "react-modal";
import { Input } from "../../Components/ui/input.jsx";
import { Textarea } from "../../Components/ui/textarea.jsx";
import { Button } from "../../Components/ui/button.jsx";
import Text_CP from "@/Components/EmployeeForm/InputsComponents/Text_cp.jsx";


function AddTextForm({ isModalOpen, setIsModalOpen, currentItem, setCurrentItem, handleUpdateItem, items, setItems }) {

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item && item.id === active.id);
        const newIndex = items.findIndex((item) => item && item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        console.log(newItems);
        return newItems;
      });
    }
  };

  const handleInputChange = (id, value) => {
    setItems((items) =>
        items.map((item) =>
            item && item.id === id ? { ...item, value } : item
        )
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
      const existingItemIndex = prevItems.findIndex((item) => item.id === currentItem.id);

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = currentItem;
        return updatedItems;
      } else {
        return [...prevItems, currentItem];
      }
    });

    setIsModalOpen(false);
  };

    const handleDeleteItem = (id) => {
        setItems((items) => items.filter((item) => item.id !== id));
    };

  useEffect(() => {
    console.log(items)
  }, [items]);


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
          <SortableContext items={items.filter(Boolean).map(item => item.id)} strategy={verticalListSortingStrategy}>
            {items.map((item) => item && (
                <SortItem key={item.id} id={item.id} item={item} onInputChange={handleInputChange} onEditItem={handleEditItem}   handleDeleteItem={handleDeleteItem} className={"m-4"} />
          ))}
          </SortableContext>
        </DndContext>

        {currentItem && (
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} ariaHideApp={false} appElement={document.getElementById('root')}>
              <h2 className="text-center text-xl text-black">Configure Input</h2>
              {currentItem && (
                  <form onSubmit={handleConfigureItem}>
                    <label className="text-black">
                      Label:
                      <Input className="block text-black"
                             type="text"
                             value={currentItem.label}
                             onChange={(e) =>
                                 setCurrentItem({ ...currentItem, label: e.target.value })}/>
                    </label>
                    <label className="text-black">
                      Placeholder:
                      <Input className="block text-black"
                             type="text"
                             value={currentItem.placeholder}
                             onChange={(e) =>
                                 setCurrentItem({
                                   ...currentItem,
                                   placeholder: e.target.value,
                                 })
                             }
                      />
                    </label>
                    <label className="text-black">
                      Tooltip:
                      <Input className="block text-black"
                             type="text"
                             value={currentItem.tooltip}
                             onChange={(e) =>
                                 setCurrentItem({ ...currentItem, tooltip: e.target.value })
                             }
                      />
                    </label>
                    <label className="text-black">
                      Description:
                      <Textarea
                          className="block text-black"
                          value={currentItem.description}
                          onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                description: e.target.value,
                              })
                          }
                      />
                    </label>
                      {currentItem &&  currentItem.label &&  (
                    <Button onClick={handleConfigureItem} variant="default" type="submit">Save</Button>
                        )}
                  </form>
              )}

                    <div className="mt-12">
                        <h2 className="mb-6 text-center text-2xl text-black">Preview</h2>
                        {currentItem && currentItem.label && (
                <Text_CP handleDeleteItem={handleDeleteItem} onEditItem={handleEditItem} item={currentItem} id={currentItem.id} onInputChange={handleInputChange} setNodeRef={() => {}} attributes={{}} listeners={{}} handle={() => {}}
                />
                )}
                    </div>
            </Modal>
        )}
      </div>


  );
}

export default AddTextForm;
