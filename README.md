# The Odin Project
# Project #5: Virtual Library

**Goal**: Create a virtual library with persistent memory as part of The Odin Project [curriculum](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/library).

**Live Link**: 👉 https://grumbeard.github.io/grumbrary/

## About
This is the first assignment after introducing Object Contructors and Prototypal Inheritance. It requires the use of the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) to ensure a 'library' of Book objects can be stored, retrieved, and updated with persistence.

This lightweight app is built with: HTML/CSS and vanilla JavaScript.

## Features
- Allows users to add books to their library and indicate if they have read them or not
- Read status of each book can be changed at any time (state is persistent)
- Users may remove a book from their library at any time
- This library is seeded with a few books for demo purposes

## Future Enhancements
- Hooking the app up to Firebase to enable cloud storage
- Dynamically generating a relevant image for added books

## Challenges
- Learning how to work with the Web Storage API:
  - key values must be stored as strings, hence the array of Book objects to be stored needed to be converted to JSON strings before storage
  - JSON Stringify method is unable to preserve inherited properties/methods of given objects, hence Book objects needed to be reconstructed after retrieval from local storage

- Learning how to extract data from forms using JavaScript
- Learning how to extract data from parent nodes through triggers set on child nodes
- CSS: Turning checkbox inputs into toggles

## Implemented UI
![image](https://user-images.githubusercontent.com/51464365/114998697-cb3d1c80-9ed3-11eb-8f03-57eefc377c7e.png)
