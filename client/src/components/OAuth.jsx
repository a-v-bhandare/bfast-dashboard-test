import { useEffect } from 'react';
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    googlePhotoUrl: result.user.photoURL,
                }),
            });

            const data = await res.json();
            console.log('data', data);
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button
            type='button'
            outline
            onClick={handleGoogleClick}
            style={{
                background: 'linear-gradient(90deg, rgba(237,27,74,1) 35%, rgba(45,40,106,1) 75%)',
            }}
        >
            <AiFillGoogleCircle className='w-6 h-6 mr-2 font-poppins text-[#2D286A]' />
            Continue with Google
        </Button>
    );
}
