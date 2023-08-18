const styles = {
    spanText: {
        color:'#a594f9',
    }
}

export const About = () => {
    
    return (
        <div className="h-[100%] md:h-[100%] flex flex-col">
            <div className="flex flex-col md:flex-row justify-center md:justify-between gap-6 p-6 mt-4">
                <div className="flex-1 flex flex-col items-center mb-10 gap-10">
                    <h1 className="text-[2.5rem] md:text-[3.5rem] font-extrabold uppercase mt-2">Where <span style={styles.spanText}>Women's</span> Journeys <span style={styles.spanText}>Take</span> Center <span style={styles.spanText}>Stage</span></h1>
                    <p className="text-lg leading-9 text-left">FemmeCab is a women-only cab booking system that is meticulously designed for the safe and comfortable traveling experience of women in India. 
                       It aims at empowering women journey with enhanced safety measure, 24/7 availability, prompt pickups that is just one click away.
                    </p>
                    <p className="text-lg leading-9 text-left">
                        The features of Femme Cab aims to cater specifically to the needs and preferences of women passengers and drivers. 
                        <br/>These features aim to provide a safe, comfortable, and empowering transportation experience. 
                        <br/>
                    </p>
                </div>
    
                <div className="flex-1 flex justify-center">
                    <video 
                        className="h-[92vh] w-[85%] object-fill rounded-[40%]"
                        loop="true" autoplay="autoplay" id="vid" muted preload
                    >
                        <source src="/assets/about.webm" type="video/webm" />
                    </video>
                </div>
            </div>
            <div className="text-lg leading-9 text-left p-6">
                <p>
                    <span className="text-xl">Here are some key features of the application:</span>
                    <ul className="list-disc space-y-4 mb-2 mx-5">
                        <li><b>Women-Only Rides:</b> The primary feature of the application would be to offer women-only rides, where only female passengers can book rides and be matched with female drivers.</li>
                        <li><b>User Registration and Profiles:</b> Users can create accounts with their personal information, including name, contact details, and profile pictures. Female drivers would provide additional details like driver's license and background checks.</li>
                        <li><b>Safe and Secure Environment:</b> Femme Cab would prioritize safety by implementing features such as real-time tracking of rides, sharing ride details with trusted contacts, and an emergency panic button for passengers.</li>
                        <li><b>Driver Verification:</b> Female drivers joining the platform would go through a thorough verification process, including background checks and driver's license validation, to ensure passenger safety.</li>
                        <li><b>Booking and Scheduling:</b> Passengers can easily book rides using the app, specifying the pickup and drop-off locations, and selecting their ride options.</li>
                        <li><b>Transparent Pricing:</b> The app should display transparent fare estimates before booking, ensuring that passengers know the cost upfront.</li>
                        <li><b>In-App Payments:</b> Femme Cab would offer secure and convenient in-app payment options, reducing the need for cash transactions.</li>
                        <li><b>Customer Support:</b> Femme Cab would have a dedicated customer support system to address any issues or queries promptly.</li>
                        <li><b>Women-Centric Navigation:</b> The app would incorporate women-centric navigation features, considering safety and accessibility factors.</li>
                        <li><b>Gender-Inclusive Workforce:</b> Femme Cab may also encourage and support the inclusion of gender-diverse individuals among its drivers.</li>
                        <li><b>Social Impact Initiatives:</b> The app could support social impact initiatives focused on women's empowerment and safety.</li>
                    </ul>
                    These features have been developed in a way that respects local laws and regulations, while also ensuring inclusivity and non-discrimination. As the app grows, continuously gathering user feedback and iterating on the features will be done to meeting the evolving needs of the women-only ride booking community.
                </p>
            </div>
        </div>
    )
}
