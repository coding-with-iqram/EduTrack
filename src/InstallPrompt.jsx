    import { useEffect, useState } from 'react';


    const InstallPrompt = () => {
        const [deferredPrompt, setDeferredPrompt] = useState(null);
        const [showInstallButton, setShowInstallButton] = useState(process.env.NODE_ENV === "development");

        useEffect(() => {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                console.log("beforeinstallprompt event fired"); 
                setDeferredPrompt(e);
                setShowInstallButton(true);
            });
        }, []);

        const handleInstallClick = () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
            }
        };

        return (
            <>
                {showInstallButton && (
                    <button style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', border: 'none' }} onClick={handleInstallClick}>
                        Install App
                    </button>
                )}
            </>
        );
    };




    export default InstallPrompt;
