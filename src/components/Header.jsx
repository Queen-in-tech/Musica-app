const Header = ({handleClick}) => {
  const getSearchKey = (e) => {
    if(e.key == "Enter" ) {
      const searchKey = e.target.value;
      
      const token = window.localStorage.getItem("token");
      const searchArtiste = () => {
        fetch(`https://api.spotify.com/v1/search?q=album&type=album`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        .then((res) => (res.json()))
        .then((data) => console.log(data))
      }
      searchArtiste()
    }
  }
  
  return (
   
    <div className='mb-8 flex justify-between px-3 pt-4 sm:p-0 shrink-o items-center'>
        <div className='flex'>
        <i class="fa-solid fa-bars text-white mr-4 text-2xl cursor-pointer lg:hidden" onClick ={handleClick}></i>
        <img src="logo.svg" alt="" className='mr-16 ml-2'/>
        </div>
        <div className='bg-iconsBg p-3 rounded-2xl bg-[#0505052c] items-center w-full hidden sm:flex'>
        <i class="fa-solid fa-search text-gray-600 mr-4"></i> 
        <input type="text" onKeyDown={getSearchKey} className='bg-transparent text-zinc-300 placeholder:text-gray-500 outline-none w-full' placeholder='Search artists'/>
        </div>
        <i class="fa-solid fa-search text-icons text-2xl sm:hidden"></i> 
    </div>
  )
}

export default Header
