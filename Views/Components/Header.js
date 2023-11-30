const header = () => {
  const header = `
  <header class="bg-gray-900 flex flex-col">
  <div class="bg-gray-900 flex items-center px-5 py-2 justify-between shadow-lg">
    <div class="h-6 w-24">
      <img alt="File:Amazon logo.svg" src="https://png2.cleanpng.com/sh/9e9250309044fef175c288ea71efcf36/L0KzQYm3VcI2N6hmeZH0aYP2gLBuTfFuaat0hp9sb32wfLFuj71lcZ9zfeQ2aX6wc7L0hfxwfF55gNc2bnnqeMW0gf1mepoyTdQ5OEnkc4eBgBRjO2MzUKY8NkK5RoS4VcI4Omo1TagBNUe6PsH1h5==/kisspng-amazon-com-logo-dinner-in-camelot-the-night-ameri-5b089ac68cdb32.843626631527290566577.png" decoding="async" width="603" height="182" data-file-width="603" data-file-height="182" loading=lazy class="h-8 w-24">
    </div>
    <form class="hidden md:block flex-1">
    <div class="flex flex-1 mx-5 items-center">
      <input type="text" class="px-5 py-2 outline-none flex-1 rounded-l-lg" placeholder="Search something here">
    <div class="bg-yellow-600 px-3 py-2 rounded-r-lg">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    </div>
    </div>
    </form>
    <nav class="flex gap-2 md:gap-8">
      <a href="#" class="text-white hidden md:block" onmouseover="this.style.color='#ffd700'" onmouseout="this.style.color='#fff'">
        <li class="list-none text-sm">Hello, Sign in</li>
        <li class="list-none text-md  font-bold">Account & List</li>
      </a>
      <a href="#" class="text-white" onmouseover="this.style.color='#ffd700'" onmouseout="this.style.color='#fff'">
        <li class="list-none text-sm">Returns</li>
        <li class="list-none font-bold">& Orders</li>
      </a>
      <a href="#" class="flex text-white items-end">
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <p class="absolute top-0 right-0 font-bold bg-yellow-600 text-black rounded-full px-1 text-sm">${23}</p>
        </div>
        <p class="font-bold">Cart</p>
      </a>
    </nav>
    </div>
    <form class="md:hidden flex-1 my-2">
    <div class="flex flex-1 mx-5 items-center">
      <input type="text" class="px-5 py-2 outline-none flex-1 rounded-l-lg" placeholder="Search something here">
    <div class="bg-yellow-600 px-3 py-2 rounded-r-lg">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    </div>
    </div>
    </form>
    <div class="bg-gray-800 flex gap-6 px-5 py-2">
    <a href="#" class="text-white list-none">Amazon miniTV</a>
    <a href="#" class="text-white list-none">Sell</a>
    <a href="#" class="text-white list-none">Best Sellers</a>
    <a href="#" class="text-white list-none">Todays deals</a>
    <a href="#" class="text-white list-none">Mobile</a>
    <a href="#" class="text-white list-none">Customer Service</a>
    <a href="#" class="text-white list-none">Electronics</a>
    </div>
</header>`;
  return header;
};

module.exports = header;
