import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-2 bg-[#2D286A]'>
      <Link
        to='/'
        className='self-center whitespace-nowrap dark:text-white'
      >
        <span className='px-1 py-1 text-2xl sm:text-4xl rounded-lg text-[#ED1B4A] font-racing'>
          BFAST
        </span>
      </Link>
      <div className='flex gap-2 md:order-2'>
        <button type="button" class="hidden sm:inline focus:outline-none text-[#F1F1F1] bg-[#ED1B4A] hover:bg-red-700 font-medium rounded-md text-md px-10 py-2.5 me-2 dark:bg-[#ED1B4A] dark:hover:bg-red-700">Raise a Ticket</button>
        <form onSubmit={handleSubmit}>
          <TextInput
            type='text'
            placeholder='Track by Order ID'
            rightIcon={AiOutlineSearch}
            className='hidden md:inline'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button className='bg-gradient-to-br from-[#2D286A] to-[#ED1B4A]' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <button type="button" className="focus:outline-none sm:hidden text-[#F1F1F1] bg-[#ED1B4A] hover:bg-red-700 font-poppins rounded-md text-md px-10 py-2.5 me-2 dark:bg-[#ED1B4A] dark:hover:bg-red-700">Raise a Ticket</button>
      </Navbar.Collapse>
    </Navbar>
  );
}
