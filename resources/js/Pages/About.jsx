import {Head} from "@inertiajs/react";

import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.jsx'

export default function About({ auth, title, content }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">About</h2>}
        >
            <Head title="About" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">{title}</div>
                        <p>
                            <span className="font-semibold">Content:</span> {content}
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
