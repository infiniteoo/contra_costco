#!/bin/bash

# Run .NET application in the background
cd server && dotnet run &

# Change directory to the Angular app and run ng serve
cd client && ng serve
