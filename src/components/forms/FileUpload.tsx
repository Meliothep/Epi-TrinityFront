import { Component, JSX, Show, createSignal, splitProps } from "solid-js";
import { clsx } from "../../lib/utils";

interface FileUploadProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	helperText?: string;
	error?: string;
	dropzoneText?: string;
	accept?: string;
	maxSize?: number;
	onFilesSelected?: (files: FileList) => void;
}

export const FileUpload: Component<FileUploadProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"label",
		"helperText",
		"error",
		"dropzoneText",
		"accept",
		"maxSize",
		"onFilesSelected",
		"class",
	]);

	const [isDragging, setIsDragging] = createSignal(false);
	const [fileError, setFileError] = createSignal<string>();

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const validateFiles = (files: FileList): boolean => {
		if (local.maxSize) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].size > local.maxSize) {
					setFileError(
						`File size exceeds ${local.maxSize / 1024 / 1024}MB limit`
					);
					return false;
				}
			}
		}
		setFileError(undefined);
		return true;
	};

	const handleDrop = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const files = e.dataTransfer?.files;
		if (files && validateFiles(files)) {
			local.onFilesSelected?.(files);
		}
	};

	const handleFileSelect = (e: Event) => {
		const input = e.target as HTMLInputElement;
		const files = input.files;
		if (files && validateFiles(files)) {
			local.onFilesSelected?.(files);
		}
	};

	return (
		<div class="space-y-2">
			<Show when={local.label}>
				<label
					for={rest.id}
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{local.label}
				</label>
			</Show>

			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				class={clsx(
					"relative rounded-lg border-2 border-dashed border-input p-6 transition-colors",
					isDragging() && "border-primary bg-primary/5",
					local.error && "border-destructive",
					"hover:border-primary hover:bg-primary/5"
				)}
			>
				<input
					{...rest}
					type="file"
					accept={local.accept}
					onChange={handleFileSelect}
					class="absolute inset-0 cursor-pointer opacity-0"
					aria-invalid={local.error || fileError() ? "true" : "false"}
					aria-describedby={
						local.error || fileError()
							? `${rest.id}-error`
							: local.helperText
							? `${rest.id}-description`
							: undefined
					}
				/>
				<div class="text-center">
					<svg
						class="mx-auto h-12 w-12 text-muted-foreground"
						stroke="currentColor"
						fill="none"
						viewBox="0 0 48 48"
						aria-hidden="true"
					>
						<path
							d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<div class="mt-4 flex text-sm text-muted-foreground">
						<span class="relative rounded-md font-medium text-primary hover:text-primary/80">
							{local.dropzoneText || "Upload a file"}
						</span>
						<p class="pl-1">or drag and drop</p>
					</div>
					<Show when={local.accept}>
						<p class="text-xs text-muted-foreground">
							Allowed files: {local.accept}
						</p>
					</Show>
				</div>
			</div>

			<Show when={local.error || fileError() || local.helperText}>
				<p
					id={
						local.error || fileError()
							? `${rest.id}-error`
							: `${rest.id}-description`
					}
					class={clsx(
						"text-sm",
						local.error || fileError()
							? "text-destructive"
							: "text-muted-foreground"
					)}
				>
					{local.error || fileError() || local.helperText}
				</p>
			</Show>
		</div>
	);
};
