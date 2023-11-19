# Blueberry Changelog
Welcome to Blueberry - make everything a game! 
# Version 1.0 [Link](https://gitlab.com/Zakemski/blueberry/-/tree/59d3ec504a5322ac5382874b4065e3a9aa0b44a4)
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