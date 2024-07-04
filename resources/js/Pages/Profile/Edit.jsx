import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import {Layout} from "@/Pages/Layout.jsx";
import Profile from "@/components_ines/Profile.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import {router} from "@inertiajs/react";
import {Inertia} from "@inertiajs/inertia";

export default function Edit({ auth, mustVerifyEmail, status }) {

 const sideBarContent = (
        <Profile id={auth}/>
    );

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            Inertia.visit('/');
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    return (
        <Layout sidebar={sideBarContent}>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl"/>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h2 className="text-lg">Logout</h2>
                        <p className="mt-1 text-sm text-gray-600 mb-4">
                            Clica no botão abaixo para sair da tua conta.
                        </p>
                        <DangerButton onClick={handleLogout}>
                            Logout
                        </DangerButton>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl"/>
                    </div>


                </div>
            </div>
        </Layout>
    );
}
