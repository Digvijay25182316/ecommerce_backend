const header = () => {
  const header = `<header style="background-color: #333; color: #fff; padding: 15px 0; text-align: center; display: flex; justify-content: space-between; align-items: center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

  <div>
    <svg style="width: 40px; height: 40px; margin-right: 10px; fill: #fff;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
    <span style="font-size: 24px; font-weight: bold;">Your Shop</span>
  </div>

  <nav style="display: flex; gap: 20px;">
    <a href="#" style="text-decoration: none; color: #fff; font-weight: bold; font-size: 16px; transition: color 0.3s ease-in-out;" onmouseover="this.style.color='#ffd700'" onmouseout="this.style.color='#fff'">Home</a>
    <a href="#" style="text-decoration: none; color: #fff; font-weight: bold; font-size: 16px; transition: color 0.3s ease-in-out;" onmouseover="this.style.color='#ffd700'" onmouseout="this.style.color='#fff'">Shop</a>
    <a href="#" style="text-decoration: none; color: #fff; font-weight: bold; font-size: 16px; transition: color 0.3s ease-in-out;" onmouseover="this.style.color='#ffd700'" onmouseout="this.style.color='#fff'">Categories</a>
    <a href="#" style="text-decoration: none; color: #fff; font-weight: bold; font-size: 16px; transition: color 0.3s ease-in-out;" onmouseover="this.style.color='#ffd700'" onmouseout="this.style.color='#fff'">Contact</a>
  </nav>

  <input type="text" style="padding: 8px; border: none; border-radius: 5px; margin-right: 10px; width: 200px;" placeholder="Search">

  <svg style="width: 30px; height: 30px; fill: #fff; cursor: pointer;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M21 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-1 12H6V8h14v8zM6 6v2h11V6H6z"/>
  </svg>
</header>`;
  return header;
};

module.exports = header;
