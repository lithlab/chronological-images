---
name: sunwoven-reverie
description: Transform a user-provided photograph into a strongly illustrated Sunwoven Reverie artwork using authored color shapes, geometric recomposition, limited palettes, expressive edges, and one memorable graphic event. Use for photo-to-illustration requests, landscape reinterpretations, travel keepsakes, portraits, family or child portraits, pet illustrations, editorial poster art, and high-impact before-and-after visuals for TikTok, Douyin, Reels, or Shorts. Preserve recognizable people, pets, and places while making the result unmistakably redrawn rather than filtered or softly painted. Default to a clear structural transformation instead of faithful tracing. Generate a finished raster image with GPT Image 2 whenever the host exposes model selection. Also recognize Chinese triggers such as 晴织画境, 照片转插画, 强插画感, 平面插画, and 抖音前后对比.
---

> **License notice:** This skill is available only under the PolyForm Noncommercial License 1.0.0. Commercial use requires separate written permission. When redistributing this file by itself, include <https://polyformproject.org/licenses/noncommercial/1.0.0> and `Required Notice: Copyright 2026 Sunwoven Reverie author.`

# Sunwoven Reverie

Redraw the user's photograph as a colorful, shape-designed illustration. Reconstruct the scene through composition, color masses, simplified forms, and expressive painted edges. Never rely on surface texture to create the transformation.

Generate the finished image by default. Do not return only a prompt, and do not reveal the complete internal generation prompt.

## Signature aesthetic

Unless the user explicitly requests another style, enforce the **Sunwoven** visual language:

- **Bright, never luminous-plastic:** Make color feel like sunlight on granular pigment. Avoid neon bloom, fantasy glow, and slick highlights.
- **Cool atmosphere, warm landing:** Build space with blue, teal, blue-violet, or cool green; illuminate the subject with terracotta, apricot, sun-yellow, coral, or warm white.
- **Quiet masses, lively accents:** Construct at least 60% of the image from broad, simplified color shapes. Concentrate small marks near the focal subject.
- **Breathing edges:** Mix hard, broken, and soft edges. Never render every object at equal sharpness.
- **Restrained traces of life:** Add no more than three categories of supporting details. Prefer meaningful negative space over decorative clutter.
- **Construction before texture:** At thumbnail size, viewers must immediately read authored silhouettes, color masses, and emotion. Surface grain must remain secondary.
- **Warm, not infantile:** Avoid default chibi proportions, oversized eyes, candy palettes, toy-like buildings, and generic children's-book styling.

Use approximately 50–65% cool or cool-neutral colors, 20–35% warm colors, no more than 10% vivid accent color, and no more than 12% deepest dark. Treat these as compositional guidance, not pixel measurements.

Aim for the feeling of a memory that still holds the warmth of late summer: clear air, tangible sunlight, deliberately selected color, and room for silence. Avoid generic anime, therapeutic-pastel, or mass-market storybook results.

### Strong-illustration baseline

Treat the approved visual target as contemporary editorial gouache positioned between cut paper and painterly poster art. Every image must meet all of these conditions:

- Use roughly 10–14 dominant colors. Large regions may vary slightly through dry pigment, but must not dissolve into photographic gradients.
- Build at least 75% of portraits and 80% of landscapes from deliberate, readable color shapes.
- Make a visible before-and-after jump in at least three dimensions: silhouette or crop, color grouping, spatial layering, facial or object simplification, and graphic light design.
- Combine broad hard-edged shapes with a small number of dry, broken, or brushed edges. Avoid both airbrushed realism and sterile vector perfection.
- Create exactly one memorable graphic event, such as a diagonal sunbeam, luminous arc, orange path, oversized cast shadow, or bold negative-space wedge.
- Simplify backgrounds aggressively. A background should support the hero through 5–8 major shapes, not reproduce incidental furniture, foliage, signage, or camera blur.
- Judge the image at thumbnail size. It must still read as an intentional illustration when fine grain and brush texture disappear.

Do not confuse strong illustration with harshness. Broad color construction is required; thick universal outlines, sharp polygon cuts across every facial feature, blocky radial hair, and exaggerated lips are not. Favor graceful shape rhythm, selective edge contrast, and flattering asymmetry.

### Locked default preset

Use **Illustration Strength 8/10** unless the user explicitly requests a subtler or more abstract result. Do not silently lower this setting to preserve realism.

For every generation, apply these fixed defaults:

- **Transformation:** rebuild, do not trace; change at least three of crop, hero scale, horizon, silhouette grouping, palette, light event, and background geometry.
- **Palette:** use 10–14 dominant colors with chromatic shadows; avoid source-photo white balance and broad neutral gray.
- **Rendering:** use opaque editorial gouache, cut-paper-like masses, and limited dry-brush interruption. Never lead with cinematic, realistic, detailed, softly shaded, or painterly portrait language.
- **Edges:** keep approximately 55% designed hard or broken edges, 35% soft painted edges, and 10% small accent marks. Do not apply a universal outline.
- **Background:** compress to 5–8 major shapes and remove incidental photographic clutter.
- **Graphic event:** use exactly one strong light, path, shadow, arc, or negative-space event.
- **Finish:** use only subtle pigment or paper grain. Never request canvas, fabric, oil-paint, fleece, or texture overlays.

### Approved portrait archetype

Build portraits like contemporary editorial posters with recognizable, flattering faces:

- Preserve 5–8 identity anchors before redesigning the image.
- Use 12–16 dominant colors and construct at least 75% of the image from broad shapes.
- Construct each face from 5–9 large organic planes. Allow limited smaller planes around eyes, nose, and mouth; do not recreate continuous photographic shading.
- Keep eyes graphic but alive: almond silhouette, iris mass, one coherent highlight, natural asymmetry, and source gaze direction.
- Keep lips proportional to the source. Simplify them into 2–4 matte shapes without making them the focal point unless the source expression requires it.
- Build hair as one main silhouette plus 3–8 broad directional ribbons or grouped dry-brush clusters. Use a few fine strands only when they are essential identity cues.
- Use rounded or flowing planes on children and soft-featured subjects. Reserve sharper planes for hair, glasses, clothing folds, or architectural framing.
- Let beauty come from proportion, expression, color harmony, and shape rhythm. Never narrow the jaw, enlarge the eyes, whiten skin, or standardize the face.
- Use a bold but calm geometric background. Keep the highest contrast near the eyes and expression, not around every contour.

### Approved landscape archetype

Build landscapes like premium travel posters rather than painted photographs:

- Preserve 3–5 place anchors, then redesign scale and spatial rhythm.
- Use 10–13 dominant colors and construct at least 85% of the image from broad shapes.
- Compress space into 4–5 layers such as foreground wedge, middle ground, hero landform, atmosphere, and sky.
- Convert water to 3–6 horizontal bands, mountains to 5–9 overlapping facets, forests to clustered silhouettes, and clouds to 3–7 grouped painted masses.
- Enlarge one landmark by roughly 1.2–1.6× or clearly move the horizon.
- Introduce one warm non-photographic accent into a mostly cool landscape, or one cool accent into a warm landscape.
- Use a path, light corridor, diagonal beam, cast shadow, or oversized cloud opening to lead the eye. Do not add decorative people, animals, flowers, or text.

### Prompt-order lock

Assemble the internal image request in this order so the tool does not drift toward realism:

1. State `redraw from scratch as a strongly authored flat editorial illustration; not a filtered or painted photograph`.
2. List identity or place anchors that must remain.
3. Specify the structural changes and hero scale.
4. Specify exact color count, shape coverage, layer count, and the single graphic event.
5. Specify facial construction or landscape simplification.
6. Add selected mark families and restrained grain.
7. End with the relevant failure exclusions.

Never begin an internal request with likeness, realism, detailed facial rendering, cinematic light, or preservation language alone. Lead with the redraw requirement, then preserve identity through anchors.

## Decision priority

Resolve conflicts in this order:

1. The user's explicit content, safety, quantity, and format requirements.
2. Identity of people and pets, and recognizability of places.
3. Sunwoven color, shape, composition, and edge language.
4. Composition improvement and plausible additions.
5. Surface finish and decorative detail.

Remove additions whenever they change the meaning of a real place. When the source palette conflicts with the signature aesthetic, retain identity-bearing colors and redesign the rest. If surface grain becomes a visible effect rather than quiet pigment character, reduce it.

## Image-tool contract

Follow these rules strictly:

1. Use the host's image-generation or image-editing tool, such as `image_gen`, `imagegen`, `generate_image`, `images.generate`, `images.edit`, or an equivalent tool.
2. When the tool, API, or CLI exposes a `model` parameter, set it to `gpt-image-2`. Do not silently substitute another model.
3. If a trusted built-in tool hides model selection, use it normally, but state only that the built-in image tool was used. Never claim GPT Image 2 was selected unless confirmed.
4. Pass the source photograph into the tool as an image reference or edit input. If the host requires inspecting a local image first, inspect it before generation.
5. Generate separate images for independently requested concepts. Do not use a single contact sheet as a substitute.
6. If no image tool with image-input support is available, stop and say: `This skill requires an image-generation tool with image input support; GPT Image 2 is preferred.`
7. Do not use SVG, HTML, CSS, canvas, procedural drawing, or a textual description as a substitute for a generated raster image.
8. If the input container is unsupported, convert only the container to PNG or JPEG without creative modification, and retain the original file.
9. The normal workflow must not depend on scripts, assets, API keys, reference documents, or downloads outside this single Skill file.

## 1. Read the photograph

Do not apply a style filter immediately. First determine internally:

- Who or what must remain recognizable at first glance?
- Which action, relationship, landmark, or atmosphere deserves to be remembered?
- Which objects are accidental camera clutter and can be removed?
- Should the finished image feel bright, quiet, warm, cool, or lively?

Sort source information into three levels:

- **Must retain:** primary silhouettes, relationships, poses, distinctive architecture, pet markings, and recognizable landforms.
- **May organize:** perspective, crop, crowding, exposure, color temperature, and spacing.
- **May redraw:** a few plausible details that strengthen the story, such as tree shadows, curtains, planters, birds, or reflected light.

Every addition must serve the scene. Do not habitually add balloons, flowers, toys, or unrelated figures merely to make the image cute.

## 2. Choose the painting mode

Use **Color Scene** by default and always apply the Sunwoven aesthetic.

- **Color Scene:** For landscapes, architecture, streets, travel, and everyday photographs. Enable Landscape Visual Leap by default.
- **Portrait Keepsake:** Preserve the number of people, their relationships, pose, basic facial proportions, hairstyle, and clothing color blocks. Simplify the background without turning the person into a generic cartoon.
- **Pet Story:** Preserve species, ear shape, muzzle, eye spacing, body type, tail, and distinctive markings. Let the environment support the pet's personality.

When both people and landscape appear, prioritize what the user describes as the keepsake subject. If unstated, keep the people recognizable and let the environment carry the narrative.

### Portrait illustration minimum

A portrait must feel both like the person and unmistakably unlike a photograph. Derive likeness from proportion, contour, pose, and expression—not pores, continuous photographic shading, individual hairs, or wet highlights.

- Preserve at least five identity cues chosen from head shape, eye shape and spacing, brow direction, nose proportion, mouth shape or expression, hairline, hairstyle, pose, and clothing identity color.
- Limit skin to four main value or temperature families: base skin, warm light, middle shadow, and cool reflected light, with only a few highlights.
- Build at least 60% of the face from readable broad shapes and at least 75% of the complete portrait from flat or gently varied designed color masses.
- Reduce each eye to a dark eye shape, iris mass, and one small highlight. Remove photographic wetness, complex lashes, and glassy reflections.
- Reduce the nose to one light plane, one shadow plane, and only necessary nostril indications.
- Reduce the lips to three or four color shapes plus one dark relationship while preserving the source expression.
- Design hair first as one unified silhouette, then add a few grouped dry-brush divisions. Never copy individual hairs.
- Simplify clothing into broad masses and retain only identity-bearing pattern rhythm.
- Compress the background into five to eight irregular large shapes unless it carries identity information.
- Keep the full image within roughly fourteen dominant colors. Natural skin is allowed, but it must still use designed warm/cool planes.
- Keep grain and brush texture restrained around eyes, nose, and mouth.

#### Expression and flattering likeness

Treat expression as an identity feature, not a cosmetic afterthought. A beautiful portrait must feel attentive and emotionally present without replacing the person with a generic idealized face.

- Read the source expression from five relationships: gaze direction, upper and lower eyelid tension, brow angle, mouth-corner direction, and cheek lift. Preserve their combined emotional meaning even after simplifying the features.
- Give the two eyes subtle natural asymmetry in opening, highlight position, or lid angle. Avoid perfectly mirrored eyes and identical circular highlights.
- Keep the pupils and tiny highlights directionally coherent so the subject appears to look at the camera, another person, or the original point of attention rather than through the viewer.
- Relax the brows unless tension is essential to the source expression. Avoid rigid horizontal brows, identical arches, and brows that float independently of the eyelids.
- Build a closed or open smile from slight asymmetry in the mouth corners, upper-lip rhythm, and cheek response. Do not paste on a broad smile when the source expression is quiet.
- Let a smile affect the lower eyelids and cheeks subtly. A changed mouth with unchanged eyes reads as artificial.
- Soften harsh angular nose and under-eye shadow planes when they make the person look tired, stern, or mannequin-like, but retain identity-bearing nose width, bridge direction, eye spacing, and face shape.
- Beautify through rhythm, balance, warm/cool color, and graceful contours—not through enlarged eyes, narrowed jaws, tiny noses, whitened skin, glamour retouching, or standardized influencer features.
- For group portraits, vary each person's gaze, smile amplitude, and head rhythm according to the source. Do not give everyone the same expression.
- At thumbnail size, each face must communicate a readable emotional verb such as warm, playful, calm, curious, proud, or reflective. If the only readable state is blank, regenerate the internal art direction before generating the image.

If the result resembles a photograph covered by oil-paint or canvas texture, treat it as a failure. Revise shape design, crop, and value grouping rather than adding more brush texture.

### Landscape Visual Leap

A Color Scene must communicate “newly authored illustration” within one second while preserving the identity of the place. Use **Visual Leap** by default; reduce transformation only when the user explicitly requests faithful reconstruction.

- Lock only three to five location cues: landmark silhouette, horizon relationship, key mountain or building, main light direction, and a recognizable road or shoreline.
- Redesign scale. Enlarge one hero relative to the source by roughly 1.2–1.6×, or clearly lower or raise the horizon. Do not preserve nearly every source area ratio.
- Change at least two structural properties: crop, hero scale, horizon height, foreground occlusion, negative-space shape, visual entry path, or light landing. Color change alone does not qualify.
- Compress depth into three to five readable layers, each with a distinct silhouette and color role. Avoid continuous photographic depth transitions.
- Build at least 80% of the scene from flat or gently varied broad shapes. Limit the main landmark to five to nine principal planes and the sky to three to seven major color fields.
- Convert natural complexity into designed rhythm: clouds into grouped slabs, mountains into overlapping facets, water into horizontal bands, trees into clustered silhouettes, and streets or buildings into geometric guides.
- Use nine to fourteen dominant colors and introduce one **non-photographic color**, such as blue-violet shadow, coral reflection, teal distance, or warm lemon light. It must help model form rather than sit on top as a tint.
- Create exactly one strong but plausible **graphic event**: a sunbeam breaking through cloud, an exaggerated cast shadow, a unified wind direction, a reflective corridor, a large tree shadow, bright windows, or a ribbon-like sunset.
- Preserve one generous quiet area. Concentrate the sharpest edges, strongest warm/cool contrast, and smallest marks near the hero.
- Do not rely on adding people, animals, flowers, birds, balloons, or text for attention. Attraction must come from composition, color, light, and shape.
- Texture must not be the main transformation. With texture mentally removed, the illustration must still differ clearly from the source.

If rapid before-and-after alternation shows no obvious jump in silhouette, color masses, or visual center, treat the result as a failure. Revise hero scale, horizon, or foreground shape before adjusting color. Never solve this failure only by raising saturation or brush texture.

### Short-video reveal composition

When the user mentions TikTok, Douyin, Reels, Shorts, social media, before-and-after, reveal, thumbnail, hook, or viral potential:

- Prefer a 4:5 vertical canvas. Use 9:16 only for an explicitly requested full-screen frame.
- For a landscape source, recrop around one hero rather than shrinking the entire wide image into a vertical canvas.
- Preserve one anchor contour that can align instantly with the source during an edit transition.
- Make the hero occupy roughly 30–55% of the frame so it remains legible on a phone thumbnail.
- Place the strongest value or temperature contrast in the upper half or central thirds, away from bottom interface overlays.
- Generate only a clean final “after” image. Do not add split screens, comparison lines, titles, captions, watermarks, or platform UI.

## 3. Recompose the image

Work from broad structure toward detail:

1. Select one visual hero and place it in the most powerful position; centering is optional.
2. Use a foreground mass or shadow to lead the eye into the image.
3. Concentrate clarity and color contrast around the hero.
4. Make distant sky, mountains, water, streets, or interiors lighter, cooler, and simpler.
5. Preserve one breathing zone rather than filling every corner.

Use the source ratio, 3:2, or 16:9 for ordinary landscapes. Use 4:5 or user-specified 9:16 for short-video reveals. Prefer the source ratio or 4:5 for people and pets. Never crop through a face, an essential hand relationship, distinctive pet ears, or the sole landmark contour.

At thumbnail size, the subject must remain obvious. If only color noise remains, merge shapes and delete objects.

## 4. Build the color atmosphere

Extract identity colors from the source, but do not copy haze, color casts, or blown exposure caused by the camera. Establish five color roles:

- a cool family for sky, water, shadow, or spatial recession;
- a warm family for sunlight, skin, walls, wood, or intimacy;
- a natural or muted bridge between cool and warm;
- one sparingly used bright accent near the subject;
- one deep chromatic dark instead of broad pure black.

Place the freshest color near the visual hero and quiet the rest. Use blue-violet, deep teal, aubergine, or another chromatic dark for shadows rather than uniform gray-black.

Use one coherent lighting situation: morning side light, noon tree shadow, sunset backlight, overcast ambient light, or indoor window light. Do not combine conflicting light sources.

## 5. Use a hand-drawn language

The image must look reinterpreted by an illustrator, not covered with texture.

- Lay in sky, ground, architecture, figures, and vegetation with broad, slightly uneven color masses.
- Build contours from deliberate shapes, allowing local dry, broken, or softened edges.
- Keep architecture relatively crisp; keep clouds, trees, water, hair, and distance looser.
- Group repeated windows, leaves, tiles, flowers, and ripples into rhythm instead of copying them one by one.
- Retain only the facial or pet features necessary for recognition.
- Reserve small high-contrast marks for places where the viewer should pause.

Choose two primary mark families and no more than two supporting families:

- opaque granular blocks for walls, roads, clothing, and major silhouettes;
- dry powdery strokes for wood, stone, roofs, hair, and aged surfaces;
- soft-edged masses for cloud, mist, skin transition, distant hills, and reflected light;
- clustered dabs for foliage, grass, flowers, or mottled sunlight;
- broken lines for frames, rails, branches, folds, and facial features;
- horizontal light scars for water, glass, eyes, or metal reflections.

Do not outline every object in black or polish all marks into smooth vector shapes.

## 6. Finish as an illustration

Present a complete, flat, front-facing artwork rather than a product mockup.

- Use restrained dry gouache, pastel, colored-pencil, paper, or screen-print grain only inside or along selected color shapes.
- Preserve clear shape boundaries and focal features. Grain must never blur facial identity or spatial hierarchy.
- Allow slight handmade edge wobble, broken paint coverage, and limited registration offsets when they strengthen the composition.
- Do not add canvas weave, blanket fibers, fleece, yarn, embroidery, tufting, knitting, crochet, fabric folds, tassels, seams, labels, frames, rooms, packaging, or merchandise displays.
- If the user explicitly requests a clean digital result, omit visible grain while preserving the same shape construction.

## 7. Assemble and execute

Internally write one coherent art direction that specifies:

- source features that must remain;
- content that may be organized or omitted;
- canvas ratio, hero position, foreground lead, and distant breathing space;
- warm/cool palette and a single light direction;
- selected primary and supporting marks;
- restrained pigment or paper grain, if useful;
- explicit rejection of retained photo pixels, filter-like rendering, irrelevant text, and watermarks.

The core intent is: redraw the photograph rather than decorate it; preserve recognizable people and places while creating a new illustration through composition, color, shape, light, and mark-making.

Before generation, verify subject accuracy, spatial clarity, color hierarchy, restrained texture, and absence of invented text. Then pass the source image into the image tool and generate once.

## 8. Deliver the result

Return the generated image with a brief explanation in the user's language:

```markdown
**Sunwoven illustration**

![Sunwoven illustration](absolute-image-path-or-rendered-image)

**Visual treatment**

[Two to four sentences explaining what was preserved and how composition, color, shape, and expression were redesigned.]

**Settings**

- Mode: [Color Scene / Portrait Keepsake / Pet Story]
- Preserved: [most important identity features]
- Color: [main warm/cool relationship]
- Marks: [selected mark families]
- Tool: [actual image tool used; mention GPT Image 2 only when explicitly selected or confirmed]
```

Briefly state that generation used a prompt and the reference image. If the tool returns no local path, displaying the image is sufficient. Do not regenerate automatically unless the user asks for a revision.

## Output gate

Before submitting a generation request, verify every item:

- **Identity:** Preserve at least three verifiable features; do not genericize faces, pet markings, or landmarks.
- **Portrait transformation:** Preserve at least five identity cues while meeting four-part skin grouping, broad facial shapes, simplified features, and near-invisible facial texture.
- **Expression:** Preserve the emotional meaning of gaze, eyelids, brows, mouth corners, and cheek lift. Require coherent gaze, subtle asymmetry, and visible emotional presence; reject blank, mirrored, or mannequin-like expressions.
- **Landscape leap:** Change at least two structures, enlarge the hero or redesign the horizon, reach roughly 80% broad color shapes, and create one graphic event.
- **Mobile readability:** In short-video mode, make the hero large enough and keep the strongest contrast away from the bottom interface zone.
- **Composition:** Make one visual hero readable within one second at thumbnail size.
- **Color:** Establish cool atmosphere and warm landing; concentrate saturation rather than spreading it everywhere.
- **Light:** Use one coherent lighting logic and consistent shadow direction.
- **Marks:** Select two primary mark families and concentrate detail near the hero.
- **Surface:** Keep pigment or paper grain secondary to shape construction; reject canvas overlays, fabric simulation, and texture-led transformation.
- **Text:** Unless exact wording is supplied, generate no readable signs, posters, packaging text, or pseudo-lettering.
- **Distinctiveness:** Deliver a strongly authored Sunwoven editorial illustration, not generic anime, a photo filter, harsh vector tracing, or a generic children's book.

### Failure routing

Classify a failed result before revising it, and change only the relevant controls:

- **Too photographic:** reduce value steps, merge skin or landscape gradients into larger planes, remove individual hairs and realistic reflections, simplify the background, and restate the 75%/85% shape target. Do not merely increase saturation or grain.
- **Painted-photo look:** change crop, hero scale, horizon, silhouette grouping, and graphic event. Do not solve it with heavier brush texture.
- **Harsh or ugly portrait:** retain shape coverage but replace sharp facial polygons with organic planes, remove universal outlines, reduce lip emphasis, soften nose and under-eye shadows, and restore source proportions and expression.
- **Generic cute face:** restore source eye spacing, brow direction, mouth contour, hairline, face width, and gaze. Reject enlarged eyes and narrowed jaws.
- **Weak landscape:** enlarge the landmark, compress depth, reduce tree-by-tree detail, strengthen foreground entry, and create one clearer light or path event.
- **Sterile vector look:** add selective dry-brush breaks, slight edge wobble, irregular color registration, and varied edge softness without adding fabric texture.

Do not regenerate automatically after identifying a failure. Explain the failure briefly and wait for the user's revision request unless the user explicitly asked for iterative attempts.

After generation, check only for obvious failures: incorrect subject count, anatomical anomaly, lost identity, distracting text, photographic skin, harsh or ugly facial construction, or a result that still reads as a photograph. If a failure occurs, explain it and ask whether the user wants a revision. Do not automatically spend another generation.

## Global exclusions

Never generate retained photographic patches, ordinary filter effects, uniformly fuzzy edges, heavy shag, plastic 3D rendering, photographic skin, blank stares, perfectly mirrored eyes, mannequin expressions, standardized influencer faces, default anime faces, generic chibi characters, random decorations, copyrighted characters, muddy gray grading, neon glow, rainbow speckles, universal black outlines, excessive HDR, fake depth-of-field, unreadable signage, invented writing, signatures, logos, watermarks, borders, retail settings, or unsolicited product mockups.
