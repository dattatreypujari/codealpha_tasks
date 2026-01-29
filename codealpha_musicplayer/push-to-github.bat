@echo off
REM Quick GitHub Push Script for Music Player
REM Run this file to quickly push your project to GitHub

echo.
echo ========================================
echo    Music Player - GitHub Push Script
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed. Please install Git from https://git-scm.com
    pause
    exit /b 1
)

echo [1/6] Checking if git repository exists...
if not exist ".git" (
    echo [2/6] Initializing git repository...
    git init
    if errorlevel 1 (
        echo [ERROR] Failed to initialize git repository
        pause
        exit /b 1
    )
) else (
    echo [2/6] Git repository already exists
)

echo [3/6] Adding all files...
git add .
if errorlevel 1 (
    echo [ERROR] Failed to add files
    pause
    exit /b 1
)

echo [4/6] Creating commit...
git commit -m "Music Player: Production-ready Spotify-style web audio player"
if errorlevel 1 (
    echo [WARNING] Nothing to commit or commit failed
)

echo.
echo ========================================
echo    GitHub Repository Setup Required
echo ========================================
echo.
echo Follow these steps to complete setup:
echo.
echo 1. Go to https://github.com/new
echo 2. Create a new repository named: music-player
echo 3. Choose PUBLIC (for portfolio)
echo 4. Do NOT initialize with README
echo 5. Click "Create repository"
echo.
echo 6. Come back here and enter your GitHub username
echo.

set /p username="Enter your GitHub username: "

if "%username%"=="" (
    echo [ERROR] Username cannot be empty
    pause
    exit /b 1
)

echo [5/6] Adding remote repository...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/%username%/music-player.git
if errorlevel 1 (
    echo [ERROR] Failed to add remote repository
    pause
    exit /b 1
)

echo [6/6] Pushing to GitHub...
git branch -M main >nul 2>&1
git push -u origin main

if errorlevel 1 (
    echo.
    echo [ERROR] Push failed. Common reasons:
    echo - Incorrect username
    echo - Repository doesn't exist yet
    echo - GitHub authentication issue
    echo.
    echo Try these steps:
    echo 1. Create repository at https://github.com/new
    echo 2. Name it exactly: music-player
    echo 3. Make it PUBLIC
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo       Success! Project Uploaded
echo ========================================
echo.
echo Your project is now on GitHub!
echo.
echo Visit: https://github.com/%username%/music-player
echo.
echo Next steps:
echo 1. Deploy to GitHub Pages, Netlify, or Vercel
echo 2. Share the link on your portfolio
echo 3. Add to LinkedIn/GitHub profile
echo.
echo Happy coding!
echo.

pause
