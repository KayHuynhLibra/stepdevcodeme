// Development Process - Interactive Skill Tree

class SkillTree {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.selectedNode = null;
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.isPanning = false;
        this.isLocked = false;
        this.lastPanPoint = { x: 0, y: 0 };
        
        this.setupCanvas();
        this.createNodes();
        this.createConnections();
        this.setupEventListeners();
        this.animate();
    }

    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.draw();
    }

    createNodes() {
        // Central node
        this.nodes.push({
            id: 'coding',
            label: 'Coding',
            x: this.canvas.width / 2,
            y: 100,
            level: 0,
            type: 'skill',
            status: 'mastered',
            description: 'Core programming skills and fundamentals'
        });

        // Main branches
        this.nodes.push({
            id: 'backend',
            label: 'Backend',
            x: this.canvas.width / 2 - 300,
            y: 250,
            level: 1,
            type: 'category',
            status: 'learning',
            description: 'Server-side development and APIs'
        });

        this.nodes.push({
            id: 'algorithms',
            label: 'DSA',
            x: this.canvas.width / 2 - 100,
            y: 250,
            level: 1,
            type: 'category',
            status: 'learning',
            description: 'Data Structures & Algorithms'
        });

        this.nodes.push({
            id: 'mobile',
            label: 'Mobile',
            x: this.canvas.width / 2 + 100,
            y: 250,
            level: 1,
            type: 'category',
            status: 'planned',
            description: 'Mobile app development'
        });

        this.nodes.push({
            id: 'fullstack',
            label: 'Fullstack',
            x: this.canvas.width / 2 + 300,
            y: 250,
            level: 1,
            type: 'category',
            status: 'learning',
            description: 'Full stack web development'
        });

        // Backend sub-nodes
        this.nodes.push({
            id: 'csharp',
            label: 'C#',
            x: this.canvas.width / 2 - 400,
            y: 400,
            level: 2,
            type: 'skill',
            status: 'learning',
            description: 'C# programming language'
        });

        this.nodes.push({
            id: 'express',
            label: 'Express.js',
            x: this.canvas.width / 2 - 300,
            y: 400,
            level: 2,
            type: 'skill',
            status: 'learning',
            description: 'Node.js web framework'
        });

        this.nodes.push({
            id: 'php',
            label: 'PHP',
            x: this.canvas.width / 2 - 200,
            y: 400,
            level: 2,
            type: 'skill',
            status: 'planned',
            description: 'PHP server-side scripting'
        });

        // DSA sub-nodes
        this.nodes.push({
            id: 'search',
            label: 'Search Algorithms',
            x: this.canvas.width / 2 - 100,
            y: 400,
            level: 2,
            type: 'skill',
            status: 'learning',
            description: 'Binary search, linear search, etc.'
        });

        this.nodes.push({
            id: 'sorting',
            label: 'Sorting',
            x: this.canvas.width / 2,
            y: 400,
            level: 2,
            type: 'skill',
            status: 'learning',
            description: 'Sorting algorithms'
        });

        // Mobile sub-nodes
        this.nodes.push({
            id: 'android',
            label: 'Android',
            x: this.canvas.width / 2 + 100,
            y: 400,
            level: 2,
            type: 'skill',
            status: 'planned',
            description: 'Android development with Java/Flutter'
        });

        // Fullstack sub-nodes
        this.nodes.push({
            id: 'javascript',
            label: 'JavaScript',
            x: this.canvas.width / 2 + 200,
            y: 400,
            level: 2,
            type: 'skill',
            status: 'learning',
            description: 'JavaScript programming'
        });

        this.nodes.push({
            id: 'typescript',
            label: 'TypeScript',
            x: this.canvas.width / 2 + 300,
            y: 400,
            level: 2,
            type: 'skill',
            status: 'planned',
            description: 'TypeScript for type safety'
        });

        this.nodes.push({
            id: 'figma',
            label: 'Figma',
            x: this.canvas.width / 2 + 400,
            y: 400,
            level: 2,
            type: 'tool',
            status: 'learning',
            description: 'Design and prototyping tool'
        });
    }

    createConnections() {
        // Coding to main branches
        this.connections.push({ from: 'coding', to: 'backend' });
        this.connections.push({ from: 'coding', to: 'algorithms' });
        this.connections.push({ from: 'coding', to: 'mobile' });
        this.connections.push({ from: 'coding', to: 'fullstack' });

        // Backend connections
        this.connections.push({ from: 'backend', to: 'csharp' });
        this.connections.push({ from: 'backend', to: 'express' });
        this.connections.push({ from: 'backend', to: 'php' });

        // DSA connections
        this.connections.push({ from: 'algorithms', to: 'search' });
        this.connections.push({ from: 'algorithms', to: 'sorting' });

        // Mobile connections
        this.connections.push({ from: 'mobile', to: 'android' });

        // Fullstack connections
        this.connections.push({ from: 'fullstack', to: 'javascript' });
        this.connections.push({ from: 'fullstack', to: 'typescript' });
        this.connections.push({ from: 'express', to: 'figma' });
    }

    setupEventListeners() {
        // Canvas click
        this.canvas.addEventListener('click', (e) => {
            if (this.isLocked) return;
            this.handleClick(e);
        });

        // Canvas mouse move
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });

        // Pan mode
        this.canvas.addEventListener('mousedown', (e) => {
            if (this.isPanning) {
                this.isPanning = true;
                this.lastPanPoint = this.getMousePos(e);
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isPanning && this.lastPanPoint) {
                const currentPos = this.getMousePos(e);
                this.panX += currentPos.x - this.lastPanPoint.x;
                this.panY += currentPos.y - this.lastPanPoint.y;
                this.lastPanPoint = currentPos;
                this.draw();
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.isPanning = false;
            this.lastPanPoint = null;
        });

        // Zoom controls
        document.getElementById('zoomIn').addEventListener('click', () => {
            this.zoom = Math.min(this.zoom * 1.2, 3);
            this.draw();
        });

        document.getElementById('zoomOut').addEventListener('click', () => {
            this.zoom = Math.max(this.zoom / 1.2, 0.5);
            this.draw();
        });

        document.getElementById('fitToScreen').addEventListener('click', () => {
            this.fitToScreen();
        });

        document.getElementById('panMode').addEventListener('click', () => {
            this.isPanning = !this.isPanning;
            document.getElementById('panMode').classList.toggle('active');
        });

        document.getElementById('lockMode').addEventListener('click', () => {
            this.isLocked = !this.isLocked;
            const lockBtn = document.getElementById('lockMode');
            lockBtn.textContent = this.isLocked ? '🔓' : '🔒';
            lockBtn.classList.toggle('active');
        });

        // Close detail box
        document.getElementById('closeDetail').addEventListener('click', () => {
            this.selectedNode = null;
            document.getElementById('detailBox').style.display = 'none';
        });

        // Mouse wheel zoom
        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            this.zoom = Math.max(0.5, Math.min(3, this.zoom * delta));
            this.draw();
        });
    }

    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    handleClick(e) {
        const pos = this.getMousePos(e);
        const clickedNode = this.getNodeAt(pos.x, pos.y);
        
        if (clickedNode) {
            this.selectedNode = clickedNode;
            this.showNodeDetails(clickedNode);
        }
    }

    handleMouseMove(e) {
        const pos = this.getMousePos(e);
        const node = this.getNodeAt(pos.x, pos.y);
        this.canvas.style.cursor = node ? 'pointer' : 'default';
    }

    getNodeAt(x, y) {
        for (let node of this.nodes) {
            const nodeX = (node.x + this.panX) * this.zoom;
            const nodeY = (node.y + this.panY) * this.zoom;
            const nodeWidth = 120 * this.zoom;
            const nodeHeight = 40 * this.zoom;
            
            if (x >= nodeX - nodeWidth/2 && x <= nodeX + nodeWidth/2 &&
                y >= nodeY - nodeHeight/2 && y <= nodeY + nodeHeight/2) {
                return node;
            }
        }
        return null;
    }

    showNodeDetails(node) {
        document.getElementById('detailTitle').textContent = node.label;
        document.getElementById('detailDescription').textContent = node.description;
        document.getElementById('detailLevel').textContent = node.level;
        document.getElementById('detailType').textContent = node.type;
        
        const statusMap = {
            'mastered': 'Mastered',
            'learning': 'Learning',
            'planned': 'Planned'
        };
        document.getElementById('detailStatus').textContent = statusMap[node.status] || node.status;
        
        document.getElementById('detailBox').style.display = 'block';
    }

    fitToScreen() {
        // Calculate bounds
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        
        this.nodes.forEach(node => {
            minX = Math.min(minX, node.x);
            minY = Math.min(minY, node.y);
            maxX = Math.max(maxX, node.x);
            maxY = Math.max(maxY, node.y);
        });

        const padding = 100;
        const width = maxX - minX + padding * 2;
        const height = maxY - minY + padding * 2;
        
        const scaleX = this.canvas.width / width;
        const scaleY = this.canvas.height / height;
        this.zoom = Math.min(scaleX, scaleY) * 0.9;
        
        this.panX = (this.canvas.width / 2) / this.zoom - (minX + maxX) / 2;
        this.panY = (this.canvas.height / 2) / this.zoom - (minY + maxY) / 2;
        
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw stars background
        this.drawStars();
        
        // Save context
        this.ctx.save();
        
        // Apply zoom and pan
        this.ctx.translate(this.panX * this.zoom, this.panY * this.zoom);
        this.ctx.scale(this.zoom, this.zoom);
        
        // Draw connections
        this.drawConnections();
        
        // Draw nodes
        this.drawNodes();
        
        // Restore context
        this.ctx.restore();
    }

    drawStars() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const size = Math.random() * 2;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawConnections() {
        this.ctx.strokeStyle = 'rgba(102, 126, 234, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        
        this.connections.forEach(conn => {
            const fromNode = this.nodes.find(n => n.id === conn.from);
            const toNode = this.nodes.find(n => n.id === conn.to);
            
            if (fromNode && toNode) {
                this.ctx.beginPath();
                this.ctx.moveTo(fromNode.x, fromNode.y);
                this.ctx.lineTo(toNode.x, toNode.y);
                this.ctx.stroke();
            }
        });
        
        this.ctx.setLineDash([]);
    }

    drawNodes() {
        this.nodes.forEach(node => {
            const isSelected = this.selectedNode && this.selectedNode.id === node.id;
            
            // Node glow effect
            if (isSelected) {
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = '#667eea';
            } else {
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = 'rgba(102, 126, 234, 0.5)';
            }
            
            // Node background
            const gradient = this.ctx.createLinearGradient(
                node.x - 60, node.y - 20,
                node.x + 60, node.y + 20
            );
            
            if (node.status === 'mastered') {
                gradient.addColorStop(0, '#4caf50');
                gradient.addColorStop(1, '#45a049');
            } else if (node.status === 'learning') {
                gradient.addColorStop(0, '#667eea');
                gradient.addColorStop(1, '#764ba2');
            } else {
                gradient.addColorStop(0, '#666');
                gradient.addColorStop(1, '#555');
            }
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(node.x - 60, node.y - 20, 120, 40);
            
            // Node border
            this.ctx.strokeStyle = isSelected ? '#fff' : 'rgba(255, 255, 255, 0.3)';
            this.ctx.lineWidth = isSelected ? 3 : 2;
            this.ctx.strokeRect(node.x - 60, node.y - 20, 120, 40);
            
            // Node text
            this.ctx.shadowBlur = 0;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 14px Inter';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(node.label, node.x, node.y);
        });
    }

    animate() {
        requestAnimationFrame(() => {
            // Add subtle animations if needed
            this.animate();
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const skillTree = new SkillTree('skillTreeCanvas');
    
    // Initial fit to screen
    setTimeout(() => {
        skillTree.fitToScreen();
    }, 100);
});


