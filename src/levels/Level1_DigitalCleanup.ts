import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { Level } from './Level';
import type { Game } from '../Game';
import { Game as GameClass } from '../Game';

interface FileIcon {
  container: Container;
  x: number;
  y: number;
  width: number;
  height: number;
  dragging: boolean;
  collected: boolean;
}

export class Level1_DigitalCleanup extends Level {
  private files: FileIcon[] = [];
  private recycleBin!: Container;
  private binBounds = { x: 0, y: 0, width: 120, height: 140 };
  private draggedFile: FileIcon | null = null;
  private dragOffset = { x: 0, y: 0 };
  private filesCollected: number = 0;
  private totalFiles: number = 7;
  private levelComplete: boolean = false;

  constructor(game: Game) {
    super(game);
  }

  init(): void {
    // Desktop background
    const background = new Graphics();
    background.rect(0, 0, GameClass.WIDTH, GameClass.HEIGHT);
    background.fill(0x008080); // Classic teal desktop
    this.container.addChild(background);

    // Desktop pattern
    for (let x = 0; x < GameClass.WIDTH; x += 50) {
      for (let y = 0; y < GameClass.HEIGHT; y += 50) {
        if ((x + y) % 100 === 0) {
          const dot = new Graphics();
          dot.circle(x, y, 2);
          dot.fill({ color: 0x006666, alpha: 0.3 });
          this.container.addChild(dot);
        }
      }
    }

    // Create recycle bin
    this.createRecycleBin();

    // Create file icons
    this.createFiles();

    // Counter display
    const counterStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 24,
      fill: 0xffffff,
      dropShadow: { color: 0x000000, blur: 2, distance: 2 },
    });

    const counter = new Text({ text: `Files: 0/${this.totalFiles}`, style: counterStyle });
    counter.position.set(GameClass.WIDTH / 2 - 60, GameClass.HEIGHT - 50);
    this.container.addChild(counter);
  }

  private createRecycleBin(): void {
    this.recycleBin = new Container();

    // Position in bottom-right corner
    const binX = GameClass.WIDTH - 150;
    const binY = GameClass.HEIGHT - 180;
    this.recycleBin.position.set(binX, binY);

    // Bin body
    const body = new Graphics();
    body.roundRect(0, 30, 100, 100, 5);
    body.fill(0x444444);
    body.stroke({ color: 0x666666, width: 2 });
    this.recycleBin.addChild(body);

    // Bin lid
    const lid = new Graphics();
    lid.roundRect(-5, 0, 110, 30, 5);
    lid.fill(0x555555);
    lid.stroke({ color: 0x777777, width: 2 });
    this.recycleBin.addChild(lid);

    // Recycle symbol
    const symbolStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 40,
      fill: 0x00aa00,
    });

    const symbol = new Text({ text: '♻', style: symbolStyle });
    symbol.anchor.set(0.5);
    symbol.position.set(50, 80);
    this.recycleBin.addChild(symbol);

    // Label
    const labelStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 14,
      fill: 0xffffff,
    });

    const label = new Text({ text: 'Recycle Bin', style: labelStyle });
    label.anchor.set(0.5);
    label.position.set(50, 145);
    this.recycleBin.addChild(label);

    this.container.addChild(this.recycleBin);

    // Update bounds - make hit area slightly larger than visual for better drop detection
    this.binBounds = {
      x: binX - 20,
      y: binY - 20,
      width: 140,
      height: 170,
    };
  }

  private createFiles(): void {
    const fileTypes = [
      { name: 'Document.txt', color: 0xffffff, icon: '📄' },
      { name: 'Photo.jpg', color: 0x88ccff, icon: '🖼️' },
      { name: 'Music.mp3', color: 0xffcc88, icon: '🎵' },
      { name: 'Video.mp4', color: 0xff88cc, icon: '🎬' },
      { name: 'Archive.zip', color: 0xcccc88, icon: '📦' },
      { name: 'Folder', color: 0xffdd44, icon: '📁' },
      { name: 'App.exe', color: 0x88ff88, icon: '💻' },
    ];

    // Generate random positions (avoiding recycle bin area)
    const positions = this.generatePositions(this.totalFiles);

    for (let i = 0; i < this.totalFiles; i++) {
      const fileType = fileTypes[i % fileTypes.length];
      const pos = positions[i];
      const file = this.createFileIcon(fileType.name, fileType.color, fileType.icon, pos.x, pos.y);
      this.files.push(file);
      this.container.addChild(file.container);
    }
  }

  private generatePositions(count: number): { x: number; y: number }[] {
    const positions: { x: number; y: number }[] = [];
    const margin = 100;
    const minDistance = 120;

    // Define safe area (excluding recycle bin zone)
    const safeWidth = GameClass.WIDTH - 350; // Leave space for recycle bin on right
    const safeHeight = GameClass.HEIGHT - 250; // Leave space for bottom UI

    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let valid = false;
      let x = 0, y = 0;

      while (!valid && attempts < 200) {
        x = margin + Math.random() * (safeWidth - margin * 2);
        y = margin + Math.random() * (safeHeight - margin);

        // Check distance from other files
        valid = positions.every((pos) => {
          const dx = pos.x - x;
          const dy = pos.y - y;
          return Math.sqrt(dx * dx + dy * dy) > minDistance;
        });

        // Double-check not overlapping recycle bin area
        if (x > this.binBounds.x - 150 && y > this.binBounds.y - 150) {
          valid = false;
        }

        attempts++;
      }

      // If still no valid position, force place in safe grid
      if (!valid) {
        const gridX = (i % 4) * 200 + margin;
        const gridY = Math.floor(i / 4) * 150 + margin;
        x = gridX;
        y = gridY;
      }

      positions.push({ x, y });
    }

    return positions;
  }

  private createFileIcon(
    name: string,
    color: number,
    icon: string,
    x: number,
    y: number
  ): FileIcon {
    const container = new Container();
    container.position.set(x, y);

    // Icon background
    const bg = new Graphics();
    bg.roundRect(0, 0, 80, 80, 8);
    bg.fill(color);
    bg.stroke({ color: 0x333333, width: 2 });
    container.addChild(bg);

    // Icon emoji
    const iconStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 36,
    });

    const iconText = new Text({ text: icon, style: iconStyle });
    iconText.anchor.set(0.5);
    iconText.position.set(40, 35);
    container.addChild(iconText);

    // File name
    const nameStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 12,
      fill: 0x000000,
    });

    const nameText = new Text({
      text: name.length > 10 ? name.slice(0, 8) + '...' : name,
      style: nameStyle,
    });
    nameText.anchor.set(0.5);
    nameText.position.set(40, 68);
    container.addChild(nameText);

    return {
      container,
      x,
      y,
      width: 80,
      height: 80,
      dragging: false,
      collected: false,
    };
  }

  enter(): void {
    this.filesCollected = 0;
    this.draggedFile = null;
    this.levelComplete = false;

    // Regenerate file positions each time to avoid bin overlap
    const positions = this.generatePositions(this.totalFiles);

    // Reset files with new positions
    this.files.forEach((file, index) => {
      file.collected = false;
      file.dragging = false;
      file.container.visible = true;
      // Update stored position and container position
      file.x = positions[index].x;
      file.y = positions[index].y;
      file.container.position.set(file.x, file.y);
    });

    this.updateCounter();
  }

  update(_deltaTime: number): void {
    // Don't process if level is complete
    if (this.levelComplete) return;

    const mouseX = this.getMouseX();
    const mouseY = this.getMouseY();
    const mouseDown = this.isMouseDown();

    // Handle dragging
    if (mouseDown) {
      if (this.draggedFile) {
        // Continue dragging
        this.draggedFile.container.position.set(
          mouseX - this.dragOffset.x,
          mouseY - this.dragOffset.y
        );
      } else {
        // Check for file pickup
        for (const file of this.files) {
          if (file.collected) continue;

          const bounds = {
            x: file.container.position.x,
            y: file.container.position.y,
            width: file.width,
            height: file.height,
          };

          if (
            mouseX >= bounds.x &&
            mouseX <= bounds.x + bounds.width &&
            mouseY >= bounds.y &&
            mouseY <= bounds.y + bounds.height
          ) {
            this.draggedFile = file;
            file.dragging = true;
            this.dragOffset = {
              x: mouseX - file.container.position.x,
              y: mouseY - file.container.position.y,
            };

            // Bring to front
            this.container.removeChild(file.container);
            this.container.addChild(file.container);
            break;
          }
        }
      }
    } else {
      // Release drag
      if (this.draggedFile) {
        const file = this.draggedFile;
        this.checkDrop(file);
        // Only cleanup if not completed (checkDrop may trigger level complete)
        if (!this.levelComplete && this.draggedFile) {
          this.draggedFile.dragging = false;
          this.draggedFile = null;
        }
      }
    }

    // Highlight recycle bin when dragging over
    if (this.draggedFile) {
      const fileX = this.draggedFile.container.position.x + 40;
      const fileY = this.draggedFile.container.position.y + 40;

      const overBin =
        fileX >= this.binBounds.x &&
        fileX <= this.binBounds.x + this.binBounds.width &&
        fileY >= this.binBounds.y &&
        fileY <= this.binBounds.y + this.binBounds.height;

      // Visual feedback
      const binBody = this.recycleBin.children[0] as Graphics;
      if (overBin) {
        binBody.tint = 0x88ff88;
      } else {
        binBody.tint = 0xffffff;
      }
    }
  }

  private checkDrop(file: FileIcon): void {
    const fileX = file.container.position.x + 40;
    const fileY = file.container.position.y + 40;

    const overBin =
      fileX >= this.binBounds.x &&
      fileX <= this.binBounds.x + this.binBounds.width &&
      fileY >= this.binBounds.y &&
      fileY <= this.binBounds.y + this.binBounds.height;

    if (overBin) {
      // File collected!
      file.collected = true;
      file.container.visible = false;
      this.filesCollected++;
      this.updateCounter();
      this.game.feedbackManager.success();
      console.log(`File collected! ${this.filesCollected}/${this.totalFiles}`);

      // Check for completion
      if (this.filesCollected >= this.totalFiles) {
        console.log('All files collected! Completing level...');
        this.levelComplete = true;
        this.complete();
        return; // Exit early, let update() handle cleanup
      }
    } else {
      // Snap back to original position
      file.container.position.set(file.x, file.y);
    }

    // Reset bin highlight
    const binBody = this.recycleBin.children[0] as Graphics;
    binBody.tint = 0xffffff;
  }

  private updateCounter(): void {
    const counter = this.container.children.find(
      (child) => child instanceof Text && child.position.y === GameClass.HEIGHT - 50
    ) as Text | undefined;

    if (counter) {
      counter.text = `Files: ${this.filesCollected}/${this.totalFiles}`;
    }
  }

  exit(): void {
    this.draggedFile = null;
  }
}
