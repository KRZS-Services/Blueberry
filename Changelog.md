# Blueberry Changelog
Welcome to Blueberry - make everything a game! 
## Version 1.0 [Link](https://gitlab.com/Zakemski/blueberry/-/tree/59d3ec504a5322ac5382874b4065e3a9aa0b44a4)
- Initial release
## Version 1.1 [Link](https://gitlab.com/Zakemski/blueberry/-/tree/6f6c9735b61637aefb19ad6fe3042a1b4241f7fb)
- Removed debug functions
- Animated XP gain
## Version 1.2 [Link](https://gitlab.com/Zakemski/blueberry/-/tree/56607059ef5362f92531d33717650d1488179e9f)
- Added confetti upon level up
- Added device memory
- Added audio playback on devices that don't support the Web Audio API
## Version 2.0 [Link](https://gitlab.com/Zakemski/blueberry/-/tree/fc9e54a6cd0bc59476c8f0a6efb94a44c555d23a)
- Added rewards
- Added button menu
- Moved the clear data button to the button menu
- Changed the width of buttons on the task creation screen
- Fixed a bug where buttons could be clicked more than once, leading in their functions being repeated
- Fixed a bug that displayed the "Please fill out this field" message for a short time when the Cancel button is clicked and there is no text input
## Version 2.1 [Link](https://gitlab.com/Zakemski/blueberry/-/tree/9fc3776be4e23ecff32e4a41501610d5853124df)
- Tasks are now editable
- Added priority markers
- Added console debug feature `showDebugOption(num)`
- Fixed a bug that would stop task containers from being removed
- Fixed levelup message and task messages not playing
- Fixed a bug that didn't allow the enabaling of task messages to be saved
## Version 2.2 [Link](https://gitlab.com/Zakemski/blueberry/-/tree/19db45396b9bf1263f1026325a82e2b3ded1351b)
- Fixed a bug that would delete and corrupt the task list when a task is edited
- Fixed another bug where buttons could be clicked more than once, leading in their functions being repeated
- Fixed a bug that displayed the task name input text being removed when the task creation form fades out
- Fixed a bug that wouldn't default the task value after the task creation form fades out
## Version 2.3 [Link](https://gitlab.com/Zakemski/blueberry/-/tree/dd0ac279468e09a483b3c045301dd388ae590c40)
- Added custom theme
- Made the website more suitable for devices with smaller screens
- Other small changes
#### *2.3.1 Small Fix*
___
- Javascript files will no longer be cached by the browser
#### *2.3.2 Small Fix*
___
- Caching should no longer happen, and CSS files should be instantly modified. However, expect more fixes in the future
#### *2.3.3 Small Fix*
___
- Well, this is annoying. This time it really shouldn't happen.
#### *2.3.4 Small Fix*
___
- It still didn't work, but we worked around the issue by adding the styles we need in the main `index.html` file.
#### *2.3.5 Small Fix*
___
- It **STILL** didn't work, but we worked around the issue by modifying the style tag directly. This shouldn't effect the cache.
## Version 2.4 [Link](https://gitlab.com/Zakemski/blueberry/-/tree/ffb8d6a4a42996e680c582800ded9e96ddca54f8)
- XP width now has a border radius
- Added theme styling for the XP bar
## Version 2.5 [Link](https://gitlab.com/Zakemski/blueberry/-/tree/a7dcf8a11e6c1a035246bb54694bee99f3a3d74b)
- Added console debug feature `developerMode()`
## Version 3.0a [Link](https://gitlab.com/Zakemski/blueberry/-/tree/a0a220f63d2e17526a807e9f78463d050bf60f5e)
- Moved the menu buttons to their own sidebar
- On supported browsers, the side menus will blur the background
- The new task button now has a dark overlay and uses the `pointer` cursor
- Fixed a bug where animations would not play on some browsers and computers
- Fixed another bug that allowed clicking of components in the task creation modal while fading away
- Changed the header name to "Blueberry"
- Added icons by the side menu titles
- Added the statistics tab
#### *3.0a.1 Small Fix*
___
- The statistics menu displays properly on smaller devices
- The "Time Online" statistic has been fixed
## Version 3.0b [Link](https://gitlab.com/Zakemski/blueberry/-/tree/ba063d79b77f68c684f150f74bbde0dab5423218)
- Name editing will now only happen `onkeyup` instead of `oninput`
- Tasks can now be deleted without gaining xp
- Added custom fonts
- Added custom rewards
- Added the `notify()` function
## Version 3.1b [Link](https://gitlab.com/Zakemski/blueberry/-/tree/d6c86bc5b7e87a3181f76d45e5b722e03b1d88c0)
- Fixed a bug that would trigger both modals when the "Add Reward" button was clicked
- Made the header title name editable
## Version 4.0 [Link](https://gitlab.com/Zakemski/blueberry/-/tree/5d51e02e5fa26f71c49ffd9664066c43217a95c4)
- Completing a reward now adds a cosmetic task
- Changed the margins on the reward menu
- Added an animation on load
- The side menu is now offset and has a border radius
- Headers in modals now display the native font
- The prompt for TTS on task completion now displays the correct text
- Fixed the padding of the task list
- There is now a changelog modal on load
#### *4.0.1 Small Fix*
___
- Fixed a caching issue
- The buttons in the rewards menu display the correct font
- The task list padding is fine how it is