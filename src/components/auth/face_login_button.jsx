import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button } from '../ui/button';
import Image from 'next/image';

const FacebookLoginButton = () => {
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const accessToken = urlSearchParams.get('accessToken');

        if (accessToken) {
            Cookies.set('accessToken', accessToken, { expires: 7 });
            window.location.href = '/';
        }

    }, [])

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/facebook/login';
    };

    return (
        <Button
            onClick={handleLogin}
            variant="default"
            className="w-[250px] py-5 justify-start bg-white text-black hover:bg-slate-50 shadow-none border"
        >
            <Image
                src="/icons/facebook.svg"
                width={26}
                height={26}
                alt="Google Icon"
            />
            <span className="ml-2 pl-2 border-l-[1px] border-gray-400 text-sm">
                Đăng nhập với Facebook
            </span>
        </Button>
    );
};

export default FacebookLoginButton;
