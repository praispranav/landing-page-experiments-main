# Extract images from the application - RFC

## Background

According to Gareth Simms, we had 22 background changes in the last month.

| Date      | Country | Description                                              | PPV? | Jira Ticket                                                 |
| :-------- | :------ | :------------------------------------------------------- | :--- | :---------------------------------------------------------- |
| 31/8/2022 | ES      | Update to include LaLiga imagery                         | No   | [APL-2218](https://livesport.atlassian.net/browse/APL-2218) |
| 30/8/2022 | US      | Canelo v GGG III Imagery                                 | Yes  | [APL-2195](https://livesport.atlassian.net/browse/APL-2195) |
| 30/8/2022 | CA      | Canelo v GGG III Imagery                                 | Yes  | [APL-2195](https://livesport.atlassian.net/browse/APL-2195) |
| 30/8/2022 | UK      | Canelo v GGG III Imagery                                 | Yes  | [APL-2195](https://livesport.atlassian.net/browse/APL-2195) |
| 30/8/2022 | IE      | Canelo v GGG III Imagery                                 | Yes  | [APL-2195](https://livesport.atlassian.net/browse/APL-2195) |
| 30/8/2022 | AU      | Canelo v GGG III Imagery                                 | Yes  | [APL-2195](https://livesport.atlassian.net/browse/APL-2195) |
| 30/8/2022 | NZ      | Canelo v GGG III Imagery                                 | Yes  | [APL-2195](https://livesport.atlassian.net/browse/APL-2195) |
| 25/8/2022 | US      | 3rd change to KSI Imagery                                | Yes  | [APL-2194](https://livesport.atlassian.net/browse/APL-2194) |
| 25/8/2022 | CA      | 3rd change to KSI Imagery                                | Yes  | [APL-2194](https://livesport.atlassian.net/browse/APL-2194) |
| 25/8/2022 | UK      | 3rd change to KSI Imagery                                | Yes  | [APL-2194](https://livesport.atlassian.net/browse/APL-2194) |
| 25/8/2022 | IE      | 3rd change to KSI Imagery                                | Yes  | [APL-2194](https://livesport.atlassian.net/browse/APL-2194) |
| 25/8/2022 | US      | Revert to generic imagery after Usyk vs Joshua promotion | No   | [APL-2174](https://livesport.atlassian.net/browse/APL-2174) |
| 22/8/2022 | US      | Promote Usyk vs Joshua                                   | No   | [APL-2173](https://livesport.atlassian.net/browse/APL-2173) |
| 12/8/2022 | US      | 2nd Update to KSI Imagery to feature Swarmz              | Yes  | [APL-2150](https://livesport.atlassian.net/browse/APL-2150) |
| 12/8/2022 | CA      | 2nd Update to KSI Imagery to feature Swarmz              | Yes  | [APL-2150](https://livesport.atlassian.net/browse/APL-2150) |
| 13/8/2022 | UK      | 2nd Update to KSI Imagery to feature Swarmz              | Yes  | [APL-2150](https://livesport.atlassian.net/browse/APL-2150) |
| 14/8/2022 | IE      | 2nd Update to KSI Imagery to feature Swarmz              | Yes  | [APL-2150](https://livesport.atlassian.net/browse/APL-2150) |
| 12/8/2022 | IT      | Update Serie A Imagery for Season Start                  | No   | [APL-2135](https://livesport.atlassian.net/browse/APL-2135) |
| 8/8/2022  | US      | KSI v Wassabi Imagery                                    | Yes  | [APL-1991](https://livesport.atlassian.net/browse/APL-1991) |
| 8/8/2022  | CA      | KSI v Wassabi Imagery                                    | Yes  | [APL-2009](https://livesport.atlassian.net/browse/APL-2009) |
| 8/8/2022  | UK      | KSI v Wassabi Imagery                                    | Yes  | [APL-2010](https://livesport.atlassian.net/browse/APL-2010) |
| 8/8/2022  | IE      | KSI v Wassabi Imagery                                    | Yes  | [APL-2011](https://livesport.atlassian.net/browse/APL-2011) |

A lot of steps are required in order to change images for the LP Redesign:

1. Update images on `landing-page-experiments`
2. Adjust gradient
3. Push changes
4. Open PR
5. Go through review process
6. Merge PR
7. Check if another PR has been merged on main
8. Create release for the whole LP Redesign
9. Deploy release through FEDD

This process is too bureaucratic, takes too much effort, and the risk to deploy is further increased if, in the meanwhile, some other changes were introduced on the main branch.

We already explored a possible integration of Media Asset Management ([MAM](https://livesport.atlassian.net/wiki/spaces/ACC/pages/2550202974/Media+Asset+Management+MAM)) with the Content Engine, but media integration is only planned for the third milestone of the project.

## What we are looking for?

Come up with a temporary alternative process, until we have media integration done on Content Engine, so these image changes can be done without touching the code, or having to deploy the whole LP Redesign.

## Proposal

### FE Customer Landing Experiences Images

GitHub repository (`fe-cle-images`) or folder within the `landing-page-experiments`, that syncs all objects listed to an S3 bucket (`fe-cle-images-prod-251511879130`) for images.

#### **Why a GitHub repository?**

-   We get peer-review functionality for free
-   We can trace changes
-   We can enforce governance

#### **Governance**

PMs and Engineers from teams that consuming this bucket would be the image owners, so they can maintain control over the changes being done while ensuring the needs of the chapters they work on are being met.

A dedicated image change team could raise a PR based on a ticket created on their board, with all the information related to:

-   Who requested
-   What is the change scope (country, image type)
-   What motivated the change

On the PR, an automated comment would be published with links to the demo environment of each one of the consumers, so images can be reviewed in the chapters.

Approval by two owners would result in automatic merge of the changes.

#### **Setup**

We can create the bucket based on what was done for [FE PPV Images](https://github.com/getndazn/fe-ppv-images), which is currently used by Auth to show custom PPV images on their Sign Up flow

-   Terraform files to create the bucket
-   Image upload through pre-existing script upon PR merge

#### **Image naming convention**

To create something extensible, which supports slides and different formats, we should follow a naming convention, an example would be:

| type       | convention                                            | example                                  |
| :--------- | :---------------------------------------------------- | :--------------------------------------- |
| banner     | `{countryCode}_{type}_{imageNumber}_{imageSize}`      | ca_banner_main_001_small.jpg             |
| banner_ppv | `{entitlementSetId}_{type}_{imageNumber}_{imageSize}` | canelo_vs_ggg_3_banner_ppv_001_small.jpg |

### Environments, bucket structure and release process

The environments available will be `dev`, `stag` and `prod`. On the `image-service` configuration, it's possible to point to different buckets according to the environment, that allows us to use the same `bucketAlias` (`cle-images`) across all environments.

All images in the `dev` folder of a feature branch will be uploaded to the `dev` bucket. They will have prefixes added to their filenames based on the folder name they're under - ideally the folder name should match the branch name of the client.

**Example**

```
assets/
├── dev/
│   └── APL-2217-extract-images/
│       ├── at_banner_main_001_small.jpg
│       └── at_banner_main_001_large.jpg
├── stag/
│   ├── at_banner_main_001_small.jpg
│   ├── at_banner_main_001_large.jpg
│   ├── ca_banner_main_001_small.jpg
│   ├── ca_banner_main_001_large.jpg
│   ├── de_banner_main_001_small.jpg
│   ├── de_banner_main_001_large.jpg
│   ├── de_banner_main_002_small.jpg
│   ├── de_banner_main_002_large.jpg
│   ├── es_banner_main_001_small.jpg
│   ├── es_banner_main_001_large.jpg
│   ├── es_banner_main_002_small.jpg
│   ├── es_banner_main_002_large.jpg
│   ├── us_banner_main_001_small.jpg
│   ├── us_banner_main_001_large.jpg
│   ├── us_banner_main_002_small.jpg
│   ├── us_banner_main_002_large.jpg
│   ├── canelo_vs_ggg_3_banner_ppv_001_small.jpg
│   └── canelo_vs_ggg_3_banner_ppv_001_large.jpg
└── prod
```

The client could detect which image to consume on `dev` based on an environment variable forwarded by the CI with the branch value, then the image URL could be created with the prefix, pointing to the `dev` filename. Based on the example above, a possible filename to be called in the `image-service` request would be `APL-2217-extract-images-at_banner_main_001_small`.

If an image doesn't exist on `dev`, the request could be redirected to `stag` using S3's routing capability, this way we would always present the user with an image, even if it wasn't modified by the branch.

As soon as an image is merged, it will be synced to the `stag` bucket, and the images on the `dev` folder will be cleared. Images will be synced to the `prod` bucket once a GitHub release is done.

#### **Note: Assets on separate repository**

If by the end of this RFC we opt to have assets located in a separate repository such as `fe-cle-images`, the workflow is slightly changed. The PR will have to be opened on the separate repository instead.

On `landing-page-experiments`, all PRs opened would automatically forward an environment variable with the value of the branch through the build step, so the updated images could be consumed.

#### **Consumers**

Only Landing Pages will consume images from this bucket in a first moment.

In the future, all landing experiences will ideally consume assets through our media integration on Content Engine, this is so the image update process can be trimmed down.

We expect the following chapters to be affected:

-   Auth
-   Catalog
-   Landing Pages

If other chapters than Landing Pages show that they'd be interested in starting consuming images before the media module is integrated into Content Engine, we need to be careful with how to move forward, but that could be possible.

### Image Service

#### **Background**

The image service was initially created to expose all catalogue related tile imagery from MPX using media [entities](https://livesport.atlassian.net/wiki/spaces/ACC/pages/5821136897/Ingest+V3+Field+Analysis+-+Article+MFL+Shows).

-   v1 - 🕵🏻‍♂️
-   v2 - MISL Service
-   v3 - Migration with feature parity from MISL to DAZN
-   v4 - Atlantis Microservice

When the service was rebuilt by Atlantis, they allowed external teams to use the image service capabilities on their own buckets.

#### **External buckets**

The v4 of the Image Service allows [external buckets](https://livesport.atlassian.net/wiki/spaces/AT/pages/5732337028/Onboarding+of+external+S3+buckets+with+Image-Service+to+serve+external+imagery) to be configured so images that are not available in the original bucket that the system was designed to source can be fetched.

An entry should be added to the below config files under `default.externalSources[]` list for each environment where the integration is desired.

```ts
// DEV: packages/image-utils/src/config/dev.ts#L10
// TEST: packages/image-utils/src/config/test.ts#L10
// STAGE: packages/image-utils/src/config/stage.ts#L10
// PROD: packages/image-utils/src/config/prod.ts#L10
[
  {
    id: 'cle-images',
    bucket: 'fe-cle-images-${env}-${aws_account}',
  },
  ...
]
```

An entry should be added to allow the image-service API the IAM permissions to access the external bucket as below.

```ts
// terraform/service/api.tf#L103-L113

Effect = "Allow"
Action = ["s3:GetObject"]
Resource = [
  "${aws_s3_bucket.source.arn}/*",
  "arn:aws:s3:::fe-cle-images-*/*",
  ...
]
```

#### **Custom effect**

Custom effects can be created in order to do transformations on top of images. We could leverage this to stop fiddling with gradients every time an image is updated.

```ts
// DEV: packages/image-utils/src/config/dev.ts#L36
// TEST: packages/image-utils/src/config/test.ts#L36
// STAGE: packages/image-utils/src/config/stage.ts#L36
// PROD: packages/image-utils/src/config/prod.ts#L36

[
  {
    id: 'BannerLandscape',
    steps: [
      {
        type: 'Gradient',
        params: {
          gradients: [
            {
              type: 'Horizontal',
              from: 0.17,
              fromColor: 'rgba(12, 22, 28, 1)',
              to: 0.63,
              toColor: 'rgba(0, 0, 0, 0)',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'BannerPortrait',
    steps: [
      {
        type: 'Gradient',
        params: {
          gradients: [
            {
              type: 'Vertical',
              from: 0.75,
              fromColor: 'rgba(12, 22, 28, 1)',
              to: 1,
              toColor: 'rgba(0, 0, 0, 0)',
            },
          ],
        },
      },
    ],
  },
  ...
]
```

#### **API format**

`/v4/{bucketAlias}/{effectId}/{objectKey}/fill/{horizontalAlignment}/{verticalAlignment}/{color}/{quality}/{width}/{height}/{format}/image`

#### **Usage**

On the "Hero" section country config:

```ts
const getBackground = ({ filename, width, height }) =>
    getServiceUrl('img', 4, {
        path: `cle-images/BannerLandscape/${filename}/fill/center/top/none/90/${width}/${height}/jpg/image`,
    });

export const CA_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: [
        { src: getBackground({ filename: 'ca_banner_main_001_small', width: 750, height: 680 }) },
        {
            src: getBackground({ filename: 'ca_banner_main_001_large', width: 1024, height: 554 }),
            screenWidth: 768,
        },
        {
            src: getBackground({ filename: 'ca_banner_main_001_large', width: 1920, height: 1040 }),
            screenWidth: 1024,
        },
    ],
};
```

How this would look like in the HTML of the "Hero" section:

```html
<picture data-testid="HERO_PICTURE" class="css-jikhpu">
    <source
        srcset="
            https://images.discovery.indazn.com/ca/v4/cle-images/BannerLandscape/ca_banner_main_001_large/fill/center/top/none/90/1920/1040/jpg/image
        "
        media="(min-width: 1024px)"
        data-testid="HERO_SOURCE_1024"
    />
    <source
        srcset="
            https://images.discovery.indazn.com/ca/v4/cle-images/BannerLandscape/ca_banner_main_001_large/fill/center/top/none/90/1024/554/jpg/image
        "
        media="(min-width: 768px)"
        data-testid="HERO_SOURCE_768"
    />

    <img
        src="https://images.discovery.indazn.com/ca/v4/cle-images/BannerPortrait/ca_banner_main_001_small/fill/center/top/none/90/750/680/jpg/image"
        data-testid="HERO_SOURCE_DEFAULT"
    />
</picture>
```

### Risks

#### **Repository size getting too big due to the storage of images**

1. Can be mitigated by compressing the images before merging them
2. Recommended size for repositories by GitHub is 1gb, most images used on the project range from 100kb to 500kb.
    1. On the worst case scenario, 2000 images would be required to reach the recommended size threshold.
    2. On the worst case scenario, 10000 images would be required to reach the maximum supported size threshold.

#### **Images getting out of sync with the text of whoever is consuming the content**

1. Not a problem for PPV, as those are updated usually under a feature flag, and have unique entitlementSetIds.
2. Regular updates are either event specific or generic. As long as we make sure that the image is updated before the text, it shouldn't be a major issue.

### Workflow Comparison

#### **Case 1: Assets on `landing-page-experiments`**

| Nº  | old                                         | new                                             |
| --- | ------------------------------------------- | ----------------------------------------------- |
| 1   | Update images on `landing-page-experiments` | Update images on `landing-page-experiments`     |
| 2   | Adjust gradient                             | Push changes                                    |
| 3   | Push changes                                | Open PR                                         |
| 4   | Open PR                                     | Go through review process                       |
| 5   | Go through review process                   | Merge PR - Images synced to `stag`              |
| 6   | Merge PR                                    | Create release - Images synced to `prod` bucket |
| 7   | Check if another PR has been merged on main |                                                 |
| 8   | Create release for the whole LP Redesign    |                                                 |
| 9   | Deploy release through FEDD                 |                                                 |

#### **Case 2: Assets on separate repository - `fe-cle-images`**

| Nº  | old                                         | new                                                                |
| --- | ------------------------------------------- | ------------------------------------------------------------------ |
| 1   | Update images on `landing-page-experiments` | Update images on `fe-cle-images`                                   |
| 2   | Adjust gradient                             | Push changes                                                       |
| 3   | Push changes                                | Open PR on `fe-cle-images`                                         |
| 4   | Open PR                                     | Open PR on `landing-page-experiments` to preview image changes     |
| 5   | Go through review process                   | Go through review process                                          |
| 6   | Merge PR                                    | Merge PRs - Images synced to `stag`                                |
| 7   | Check if another PR has been merged on main | Create release on `fe-cle-images` - Images synced to `prod` bucket |
| 8   | Create release for the whole LP Redesign    |                                                                    |
| 9   | Deploy release through FEDD                 |                                                                    |

## Reference Links

-   [Catalog image specs](https://livesport.atlassian.net/wiki/spaces/WOLF/pages/5672632628/Marketing+Banner+Slider)
-   [Catalog image update process](https://livesport.atlassian.net/wiki/spaces/WOLF/pages/5681709088/Update+marketing+banner+images+with+S3)
-   [Image Service - External buckets](https://livesport.atlassian.net/wiki/spaces/AT/pages/5732337028/Onboarding+of+external+S3+buckets+with+Image-Service+to+serve+external+imagery)
-   [Image Service - Invalidate cache](https://livesport.atlassian.net/wiki/spaces/AT/pages/5917148008/Manually+invalidating+images+using+image-service-+external-cache-invalidation+lambda)
-   [Image Service - MPX ingestion process](https://livesport.atlassian.net/wiki/spaces/AT/pages/5798856164/Image+Ingestion+Proxy+Access+Knowledgebase)
-   [Media Asset Management](https://livesport.atlassian.net/wiki/spaces/ACC/pages/2550202974/Media+Asset+Management+MAM)
