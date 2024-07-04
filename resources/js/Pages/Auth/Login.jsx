import React, { useEffect } from 'react';
import Checkbox from '../../Components/Checkbox';
import GuestLayout from '../../Layouts/GuestLayout';
import InputError from '../../Components/InputError';
import InputLabel from '../..//Components/InputLabel';
import PrimaryButton from '../../Components/PrimaryButton';
import TextInput from '../../Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import logo from "../../../../storage/app/public/logos/logo-teamster-login.svg";
import backgroundImage from "../../../../storage/app/public/logos/objetos.svg";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    console.log(errors);
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Head title="Login"/>

            <div className="h-screen w-screen bg-[#F8F7FC]">
                <div>
                    <img className="z-50 fixed h-[10%] w-auto" src={logo} alt="Logo"/>
                </div>

                <div className="z-10 flex place-content-center justify-center bg-[#F8F7FC] items-center h-[80%]">
                    <div className="z-10 p-8 bg-white rounded-[2rem] shadow-lg min-h-[300px] min-w-96 flex flex-col justify-center items-center">

                        {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

                        <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="text-sm text-gray-600 ms-2">Remember me</span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
                </div>
            </div>


            <div
                className=" z-0 fixed bottom-0 left-0 w-full h-[45%] bg-no-repeat bg-cover"
                style={{backgroundImage: `url(${backgroundImage})`}}
            ></div>
        </div>
        </>
    );
}
