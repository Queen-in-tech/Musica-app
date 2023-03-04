const Header = ({handleClick}) => {
  
  return (
   
    <div className='mb-8 flex justify-between px-3 sm:p-0 shrink-o items-center'>
        <div className='flex'>
        <i class="fa-solid fa-bars text-white mr-4 text-2xl cursor-pointer sm:hidden" onClick ={handleClick}></i>
        <img src="logo.svg" alt="" className='mr-16 ml-2'/>
        </div>
        <div className='bg-iconsBg p-3 rounded-2xl bg-[#0505052c] items-center w-full hidden sm:flex'>
        <i class="fa-solid fa-search text-icons mr-4"></i> 
        <input type="text" id='search' className='bg-transparent text-zinc-300 placeholder:text-icons outline-none w-full' placeholder='Search artists'/>
        </div>
        <i class="fa-solid fa-search text-icons text-2xl sm:hidden"></i> 
    </div>
  )
}

export default Header
