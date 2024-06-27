import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Checkbox_CP from "@/Components/EmployeeForm/InputsComponents/Checkbox_cp.jsx";
import Text_CP from "@/Components/EmployeeForm/InputsComponents/Text_cp.jsx";
import Radio_CP from "@/Components/EmployeeForm/InputsComponents/Radio_cp.jsx";

function SortItem({ id, item, onInputChange, onEditItem, handleDeleteItem }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const inputStyles =
    item.type === "checkbox" ? "checkbox-styles" : "text-black";

    const handleOptionChange = (value) => {
        const selectedOption = item.options.find(opt => opt.id === value);
        console.log('Selected option ID:', selectedOption.id);
        console.log('Selected option label:', selectedOption.label);
        onInputChange(id, { id: selectedOption.id, label: selectedOption.label });
    };

  return (
    <div
      className={"my-4 bg-white p-4 min-h-fit rounded-xl gap-4 flex flex-col shadow-lg"}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
        {item.type === "checkbox" ? (
            <Checkbox_CP
                id={id}
                item={item}
                onInputChange={onInputChange}
                onEditItem={onEditItem}
                handleDeleteItem={handleDeleteItem}
                setNodeRef={setNodeRef}
                attributes={attributes}
                listeners={listeners}
                showButtons={true}
                showGrab={true}
            />
      ) : item.type === "radio" ? (
          // Radio input
            <Radio_CP
                id={id}
                item={item}
                onInputChange={onInputChange}
                onEditItem={onEditItem}
                handleDeleteItem={handleDeleteItem}
                setNodeRef={setNodeRef}
                attributes={attributes}
                listeners={listeners}
                showButtons={true}
                showGrab={true}
            />
      ) :  item.type === "text" ? (
                // Text input
                    <Text_CP
                        id={id}
                        item={item}
                        onInputChange={onInputChange}
                        onEditItem={onEditItem}
                        handleDeleteItem={handleDeleteItem}
                        setNodeRef={setNodeRef}
                        attributes={attributes}
                        listeners={listeners}
                        showButtons={true}
                        showGrab={true}
                    />
      ) : null
        }
    </div>
  );
}

export default SortItem;
