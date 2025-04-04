import {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";


export default function Modal({
                                  children, show = false, minWidth='xl', maxWidth = '4xl', closeable = true, onClose = () => {
    }
                              }) {
    const close = () => {
        console.log('Modal.js close triggered');
        if (closeable) {
            onClose();
        }
    };

    const realClose = () => {
        console.log('real close');
        onClose();
    };

    const minWidthClass = {
        sm: 'sm:min-w-sm',
        md: 'sm:min-w-md',
        lg: 'sm:min-w-lg',
        xl: 'sm:min-w-xl',
        "2xl": "sm:min-w-2xl",
    }[minWidth];

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        "2xl": "sm:max-w-2xl",
        '4xl': 'sm:max-w-4xl',
    }[maxWidth];

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0 "
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75"/>
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >

                    <Dialog.Panel
                        className={`mb-6 bg-white rounded-lg overflow-y-auto max-h-[80vh] shadow-xl transform transition-all sm:w-full sm:mx-auto ${minWidthClass} ${maxWidthClass}`}
                    >
                        <div className={""}>
                            <FontAwesomeIcon
                                icon={faXmark} onClick={realClose}
                                className="h-5 w-5 p-2 text-gray-500  hover:bg-gray-200 rounded-bl-lg cursor-default float-end"
                            />
                        </div>
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
