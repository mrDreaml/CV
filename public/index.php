<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\Controller\HomeController;

$homeController = new HomeController();
$data = $homeController->getData();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload"
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" as="style"
        onload="this.onload=null;this.rel='stylesheet'">
    <link rel="stylesheet" href="./styles.css" />

    <style>
        *:not(:defined) {
            opacity: 0;
        }
    </style>
</head>

<body>
    <header class="main-header">
        <div class="main-header__logo">DmitryDev</div>
        <nav class="main-header__nav">
            <a href="">Резюме</a>
            <a href="">Блог</a>
            <a href="">Услуги</a>
        </nav>
    </header>


    <main class="main">
        <section class="main-info">
            <img src="./assets/media/profile.webp" alt="Мое крутое фото" class="main-info__profile-photo" />
            <div class="main-info__description">
                <h1 class="main-info__title"><?= $data["author"]["fullName"] ?></h1>
                <span class="main-info__text"><?= $data["author"]["profession"] ?></span>
                <span class="main-info__text"><?= $data["author"]["langugeKnowledge"] ?></span>
            </div>
        </section>

        <section class="main-tabs">
            <jet-tabs active-tab="job">
                <template shadowRootMode="open">
                    <link rel="stylesheet" href="./assets/lib/jet/components/jet-tabs/index.css">

                    <div class="tabs-navigation" data-id="tabs-navigation">
                        <div class="active-indicator" data-id="active-indicator"></div>
                        <slot name="tab-header"></slot>
                    </div>
                    <slot name="tab-content"></slot>
                </template>

                <div slot="tab-header" data-tab-name="job" class="tabs__header-item tabs__header-item__active">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="tabs__header-item-icon">
                        <path
                            d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
                    </svg>
                    <span class="tabs__header-item-text">Опыт</span>
                </div>
                <div slot="tab-header" data-tab-name="education" class="tabs__header-item tabs__header-item__active">
                    <svg class="tabs__header-item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                            d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
                    </svg>
                    <span class="tabs__header-item-text">Образование</span>
                </div>
                <div slot="tab-header" data-tab-name="self" class="tabs__header-item">
                    <svg class="tabs__header-item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                            d="M460-420h200v-80H460v80Zm-60 60v-200h320v200H400ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Z">
                        </path>
                    </svg>
                    <span class="tabs__header-item-text">Портфолио</span>
                </div>
                <div slot="tab-header" data-tab-name="contacts" class="tabs__header-item">
                    <svg class="tabs__header-item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                            d="M162-120q-18 0-30-12t-12-30v-162q0-13 9-23.5t23-14.5l138-28q14-2 28.5 2.5T342-374l94 94q38-22 72-48.5t65-57.5q33-32 60.5-66.5T681-524l-97-98q-8-8-11-19t-1-27l26-140q2-13 13-22.5t25-9.5h162q18 0 30 12t12 30q0 125-54.5 247T631-329Q531-229 409-174.5T162-120Zm556-480q17-39 26-79t14-81h-88l-18 94 66 66ZM360-244l-66-66-94 20v88q41-3 81-14t79-28Zm358-356ZM360-244Z" />
                    </svg>
                    <span class="tabs__header-item-text">Контакты</span>
                </div>

                <div slot="tab-content" name="education" class="tabs__content-item" style="display: none;">Education
                </div>
                <div slot="tab-content" name="job" class="tabs__content-item">
                    <?php require_once __DIR__ . '/../src/Components/jobExperienceTab.php' ?>
                </div>
                <div slot="tab-content" name="self" class="tabs__content-item" style="display: none;">Tab 2 content
                </div>
                <div slot="tab-content" name="contacts" class="tabs__content-item" style="display: none;">Tab 3 content
                </div>
            </jet-tabs>
        </section>
    </main>

    <script type="module" src="./assets/lib/jet/index.js"></script>
</body>

</html>