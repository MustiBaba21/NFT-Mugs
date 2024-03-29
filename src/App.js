import React, { useState, useEffect } from 'react';
import './App.css';
import Lottie from 'lottie-react';
import animationData from './Money.json';

function App() {
  const [number, setNumber] = useState('');
  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedSkin, setSelectedSkin] = useState('');
  const [selectedMug, setSelectedMug] = useState('');
  const [selectedLogo, setSelectedLogo] = useState('');
  const [finalOverlays, setFinalOverlays] = useState({ skin: '', mug: '', logo: '' });
  const [gender, setGender] = useState('Male');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mugDropdownVisible, setMugDropdownVisible] = useState(false);
  const [logoDropdownVisible, setLogoDropdownVisible] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
    const [mugColors] = useState(['Grey', 'Blue', 'Orange']); // Define your mug colors
  const genderPath = gender === 'Male' ? 'Mug_Color' : 'Mug_Color_Female';



  const loadImage = async () => {
    const newImageUrl = `https://prod-tensor-creators-s3.s3.us-east-1.amazonaws.com/drop-metadata/e13658af-3e05-47ea-91c7-7faa4b34bd97/images/${number}.webp`;

    try {
      const response = await fetch(newImageUrl, { method: 'HEAD' });

      if (response.ok) {
        setImageUrl(newImageUrl); // Only update if the new image is accessible
      } else {
        throw new Error('Image not accessible.');
      }
    } catch (error) {
      alert('Error: The image could not be loaded. Please check the NFT number.');
      // Don't reset imageUrl here, so the previously loaded image stays
    }
  };


  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://embed.hel.io/assets/index-v1.js";
    script.type = "module";
    script.crossOrigin = "anonymous";
    script.async = true;

    script.onload = () => {
      window.helioCheckout(
        document.getElementById("helioCheckoutContainer"),
        { paylinkId: "659dcbc0e57fad7df4ac5fa5" }
      );
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const changeSkin = (newSkinColor) => {
    const genderPath = gender === 'Male' ? 'Mug_Skin-Color' : 'Mug_Skin-Color_Female';
    setSelectedSkin(`/${genderPath}/${newSkinColor}.png`);
    setDropdownVisible(false);
  };

  const changeMugColor = (newMugColor) => {
    const genderPath = gender === 'Male' ? 'Mug_Color' : 'Mug_Color_Female';
    setSelectedMug(`/${genderPath}/${newMugColor}.png`);
    setMugDropdownVisible(false);
  };

  const changeLogo = (newLogo) => {
    const genderPath = gender === 'Male' ? 'Logos' : 'Logos_Female';
    setSelectedLogo(`/${genderPath}/${newLogo}.png`);
    setLogoDropdownVisible(false);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleMugDropdown = () => {
    setMugDropdownVisible(!mugDropdownVisible);
  };

  const toggleLogoDropdown = () => {
    setLogoDropdownVisible(!logoDropdownVisible);
  };

  const generateOverlays = () => {
    if (!imageUrl) {
      alert('Please load an image first.');
      return;
    }
    setFinalOverlays({ skin: selectedSkin, mug: selectedMug, logo: selectedLogo });
    setShowAnimation(true);
  };

  useEffect(() => {
    if (showAnimation) {
      // Set the duration of the animation to match your Lottie animation
      const timer = setTimeout(() => setShowAnimation(false), 1500); // Adjust to the actual duration of your Lottie animation
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);


  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl; // Replace 'imageUrl' with the variable that holds your image URL
    link.download = 'DownloadedImage'; // This can be a dynamic name based on your requirements
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
    <div className="top-banner">
    <div className="logo-right">
          {/* Replace with actual logo image */}
          <img src="/BankmenLogo.png" alt="Logo 4" />
        </div>
       
        <h1 className="title">Give your Bankmen a GM Mug</h1>
        <div className="logos-left">
        <img src="/twitter_icon.png" alt="Logo 1" />
        <img src="/twitter_icon.png" alt="Logo 3" />
      </div>

      </div>
    <div className="container centered-content">
      <div className="main-frame"> {/* Main frame container */}
        <div className="row">
          <div className="col-md-6 mx-auto">

            {/* Button and Dropdown Section */}
            <div className="button-dropdown-container">
              <div className="input-container">
                <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className="form-control" placeholder="Bankmen #ID" maxLength="4" color ="black" />
                <button onClick={loadImage} className="btn_in btn-primary ml-2 get-image">Get Image</button>
              </div>

              <div className="dropdown-container d-flex mt-3">
                <div className="dropdown mr-2">
                  <button className="btn btn-secondary dropdown-toggle" onClick={() => setGenderDropdownVisible(!genderDropdownVisible)}>
                    {gender} {/* Displaying the selected gender */}
                  </button>
                  {genderDropdownVisible && (
                    <div className="gender-options dropdown-menu">
                      <label className="dropdown-item" onClick={() => setGender('Male')}>
                        Bankmen
                      </label>
                      <label className="dropdown-item" onClick={() => setGender('Female')}>
                        Bankwomen
                      </label>
                    </div>
                  )}
                </div>


                <div className="dropdown mr-2">
                  <button className="btn btn-secondary dropdown-toggle" onClick={toggleDropdown}>
                    Skin
                  </button>
                  {dropdownVisible && (
                    <div className="skin-options dropdown-menu">
                      {['Violet', 'Black', 'Yellow'].map(color => (
                        <label key={color} className="dropdown-item" onClick={() => changeSkin(color)}>
                          {color}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="dropdown mr-2">
                  <button className="btn btn-secondary dropdown-toggle" onClick={toggleMugDropdown}>
                    Mug Color
                  </button>
                  {mugDropdownVisible && (
                    <div className="mug-options dropdown-menu">
                      {mugColors.map(color => (
                        <label key={color} className="dropdown-item" onClick={() => changeMugColor(color)}>
                          {color}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="dropdown mr-2">
                  <button className="btn btn-secondary dropdown-toggle" onClick={toggleLogoDropdown}>
                    Logo
                  </button>
                  {logoDropdownVisible && (
                    <div className="logo-options dropdown-menu">
                      {['Bankmen Logo', 'GM'].map(logo => (
                        <label key={logo} className="dropdown-item" onClick={() => changeLogo(logo)}>
                          {logo}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <button className="btn_suc btn-success" onClick={generateOverlays}>
                  Generate
                </button>
              </div>
                <button className="btn btn-secondary dropdown-toggle" onClick={downloadImage}>
                  Downloads
                </button>
            </div>

            {/* Image Container */}
            <div className="image-container">
              {imageUrl && (
                <img src={imageUrl} alt="Loaded NFT" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', zIndex: 1 }} />
              )}
              {finalOverlays.skin && (
                <img src={finalOverlays.skin} alt="Skin Overlay" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', zIndex: 2 }} />
              )}
              {finalOverlays.mug && (
                <img src={finalOverlays.mug} alt="Mug Overlay" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', zIndex: 2 }} />
              )}
              {finalOverlays.logo && (
                <img src={finalOverlays.logo} alt="Logo Overlay" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', zIndex: 2 }} />
              )}
              {showAnimation && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
                  <Lottie animationData={animationData} style={{ width: '100%', height: '100%' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-container">
        <div id="helioCheckoutContainer" className="helio"></div>
      </div>
    </div>
    </div>
  );
}

export default App;


