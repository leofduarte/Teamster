import {Head} from "@inertiajs/react";

import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.jsx'

export default function About({ auth, title, content }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">About</h2>}
        >
            <Head title="About" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
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
